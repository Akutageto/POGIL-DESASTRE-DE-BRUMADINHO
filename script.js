// Dados dos metais para cálculos
const metalsData = {
    arsenic: { concentration: 25, limit: 10 },
    lead: { concentration: 12, limit: 5 },
    cadmium: { concentration: 4, limit: 3 },
    mercury: { concentration: 2, limit: 1 }
};

// Função para calcular o percentual de excesso
function calculateExcess() {
    // Arsênio
    const arsenicExcess = ((metalsData.arsenic.concentration - metalsData.arsenic.limit) / metalsData.arsenic.limit) * 100;
    document.getElementById('arsenic-excess').value = arsenicExcess.toFixed(2);
    
    // Chumbo
    const leadExcess = ((metalsData.lead.concentration - metalsData.lead.limit) / metalsData.lead.limit) * 100;
    document.getElementById('lead-excess').value = leadExcess.toFixed(2);
    
    // Cádmio
    const cadmiumExcess = ((metalsData.cadmium.concentration - metalsData.cadmium.limit) / metalsData.cadmium.limit) * 100;
    document.getElementById('cadmium-excess').value = cadmiumExcess.toFixed(2);
    
    // Mercúrio
    const mercuryExcess = ((metalsData.mercury.concentration - metalsData.mercury.limit) / metalsData.mercury.limit) * 100;
    document.getElementById('mercury-excess').value = mercuryExcess.toFixed(2);
    
    // Destacar as células com os valores calculados
    highlightCalculatedValues();
    
    // Mostrar alerta com resumo
    showCalculationSummary();
}

// Função para limpar os cálculos
function clearCalculations() {
    document.getElementById('arsenic-excess').value = '';
    document.getElementById('lead-excess').value = '';
    document.getElementById('cadmium-excess').value = '';
    document.getElementById('mercury-excess').value = '';
    
    // Remover destaque
    removeHighlight();
}

// Função para destacar valores calculados
function highlightCalculatedValues() {
    const inputs = document.querySelectorAll('#metals-table input[type="number"]');
    inputs.forEach(input => {
        if (input.value) {
            input.style.backgroundColor = '#d4edda';
            input.style.borderColor = '#28a745';
        }
    });
}

// Função para remover destaque
function removeHighlight() {
    const inputs = document.querySelectorAll('#metals-table input[type="number"]');
    inputs.forEach(input => {
        input.style.backgroundColor = '';
        input.style.borderColor = '#ddd';
    });
}

// Função para mostrar resumo dos cálculos
function showCalculationSummary() {
    const arsenicValue = parseFloat(document.getElementById('arsenic-excess').value);
    const leadValue = parseFloat(document.getElementById('lead-excess').value);
    const cadmiumValue = parseFloat(document.getElementById('cadmium-excess').value);
    const mercuryValue = parseFloat(document.getElementById('mercury-excess').value);
    
    const values = [
        { name: 'Arsênio', value: arsenicValue },
        { name: 'Chumbo', value: leadValue },
        { name: 'Cádmio', value: cadmiumValue },
        { name: 'Mercúrio', value: mercuryValue }
    ];
    
    const highest = values.reduce((prev, current) => (prev.value > current.value) ? prev : current);
    
    alert(`Cálculos realizados com sucesso!\n\nResumo dos percentuais de excesso:\n• Arsênio: ${arsenicValue.toFixed(1)}%\n• Chumbo: ${leadValue.toFixed(1)}%\n• Cádmio: ${cadmiumValue.toFixed(1)}%\n• Mercúrio: ${mercuryValue.toFixed(1)}%\n\nMaior excesso: ${highest.name} (${highest.value.toFixed(1)}%)`);
}

// Função para salvar respostas no localStorage
function saveAnswers() {
    const answers = {};
    
    // Salvar informações do grupo
    for (let i = 1; i <= 5; i++) {
        const member = document.getElementById(`member${i}`);
        if (member) answers[`member${i}`] = member.value;
    }
    
    // Salvar papéis
    const roles = ['manager', 'reporter', 'presenter', 'timekeeper'];
    roles.forEach(role => {
        const select = document.getElementById(role);
        if (select) answers[role] = select.value;
    });
    
    // Salvar cálculos
    const calculations = ['arsenic-excess', 'lead-excess', 'cadmium-excess', 'mercury-excess'];
    calculations.forEach(calc => {
        const input = document.getElementById(calc);
        if (input) answers[calc] = input.value;
    });
    
    // Salvar respostas das perguntas
    for (let i = 1; i <= 15; i++) {
        const question = document.getElementById(`q${i}`);
        if (question) answers[`q${i}`] = question.value;
    }
    
    // Salvar no localStorage
    localStorage.setItem('pogil-brumadinho-answers', JSON.stringify(answers));
    
    alert('Respostas salvas com sucesso! Você pode continuar trabalhando e suas respostas serão preservadas.');
}

// Função para carregar respostas salvas
function loadAnswers() {
    const saved = localStorage.getItem('pogil-brumadinho-answers');
    if (saved) {
        const answers = JSON.parse(saved);
        
        // Carregar cada campo salvo
        Object.keys(answers).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = answers[key];
            }
        });
        
        // Destacar valores calculados se existirem
        if (answers['arsenic-excess'] || answers['lead-excess'] || answers['cadmium-excess'] || answers['mercury-excess']) {
            highlightCalculatedValues();
        }
    }
}

// Função para exportar respostas
function exportAnswers() {
    const answers = {};
    
    // Coletar todas as respostas
    for (let i = 1; i <= 5; i++) {
        const member = document.getElementById(`member${i}`);
        if (member && member.value) answers[`Integrante ${i}`] = member.value;
    }
    
    // Coletar papéis
    const roleNames = {
        'manager': 'Gerente',
        'reporter': 'Relator',
        'presenter': 'Apresentador',
        'timekeeper': 'Cronometrista'
    };
    
    Object.keys(roleNames).forEach(role => {
        const select = document.getElementById(role);
        if (select && select.value) {
            const memberNum = select.value.replace('member', '');
            const memberName = document.getElementById(select.value)?.value || `Integrante ${memberNum}`;
            answers[roleNames[role]] = memberName;
        }
    });
    
    // Coletar cálculos
    const metalNames = {
        'arsenic-excess': 'Arsênio % Excedido',
        'lead-excess': 'Chumbo % Excedido',
        'cadmium-excess': 'Cádmio % Excedido',
        'mercury-excess': 'Mercúrio % Excedido'
    };
    
    Object.keys(metalNames).forEach(calc => {
        const input = document.getElementById(calc);
        if (input && input.value) answers[metalNames[calc]] = input.value + '%';
    });
    
    // Coletar respostas das perguntas
    for (let i = 1; i <= 15; i++) {
        const question = document.getElementById(`q${i}`);
        if (question && question.value) {
            answers[`Pergunta ${i}`] = question.value;
        }
    }
    
    // Criar texto para exportação
    let exportText = 'ATIVIDADE POGIL: TOXICIDADE DOS METAIS PESADOS NO DESASTRE DE BRUMADINHO\n';
    exportText += '='.repeat(80) + '\n\n';
    
    exportText += 'INFORMAÇÕES DO GRUPO:\n';
    exportText += '-'.repeat(30) + '\n';
    Object.keys(answers).forEach(key => {
        if (key.startsWith('Integrante') || ['Gerente', 'Relator', 'Apresentador', 'Cronometrista'].includes(key)) {
            exportText += `${key}: ${answers[key]}\n`;
        }
    });
    
    exportText += '\nCÁLCULOS DOS METAIS PESADOS:\n';
    exportText += '-'.repeat(30) + '\n';
    Object.keys(answers).forEach(key => {
        if (key.includes('% Excedido')) {
            exportText += `${key}: ${answers[key]}\n`;
        }
    });
    
    exportText += '\nRESPOSTAS ÀS PERGUNTAS:\n';
    exportText += '-'.repeat(30) + '\n';
    for (let i = 1; i <= 15; i++) {
        if (answers[`Pergunta ${i}`]) {
            exportText += `\nPergunta ${i}:\n${answers[`Pergunta ${i}`]}\n`;
        }
    }
    
    // Criar e baixar arquivo
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pogil-brumadinho-respostas.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Respostas exportadas com sucesso! O arquivo foi baixado para seu computador.');
}

// Função para atualizar nomes nos seletores de papéis
function updateRoleSelectors() {
    const selectors = ['manager', 'reporter', 'presenter', 'timekeeper'];
    
    selectors.forEach(selectorId => {
        const selector = document.getElementById(selectorId);
        const options = selector.querySelectorAll('option');
        
        // Atualizar texto das opções baseado nos nomes inseridos
        for (let i = 1; i <= 5; i++) {
            const memberInput = document.getElementById(`member${i}`);
            const option = selector.querySelector(`option[value="member${i}"]`);
            
            if (memberInput && option) {
                const name = memberInput.value.trim();
                option.textContent = name ? name : `Integrante ${i}`;
            }
        }
    });
}

// Função para validar seleção de papéis únicos
function validateRoleSelection(changedSelect) {
    const selectors = ['manager', 'reporter', 'presenter', 'timekeeper'];
    const selectedValue = changedSelect.value;
    
    if (selectedValue) {
        // Remover a mesma seleção de outros seletores
        selectors.forEach(selectorId => {
            if (selectorId !== changedSelect.id) {
                const selector = document.getElementById(selectorId);
                if (selector.value === selectedValue) {
                    selector.value = '';
                }
            }
        });
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Carregar respostas salvas ao carregar a página
    loadAnswers();
    
    // Adicionar listeners para atualizar seletores de papéis
    for (let i = 1; i <= 5; i++) {
        const memberInput = document.getElementById(`member${i}`);
        if (memberInput) {
            memberInput.addEventListener('input', updateRoleSelectors);
        }
    }
    
    // Adicionar listeners para validação de papéis únicos
    const roleSelectors = ['manager', 'reporter', 'presenter', 'timekeeper'];
    roleSelectors.forEach(selectorId => {
        const selector = document.getElementById(selectorId);
        if (selector) {
            selector.addEventListener('change', function() {
                validateRoleSelection(this);
            });
        }
    });
    
    // Auto-salvar a cada 30 segundos
    setInterval(function() {
        // Verificar se há conteúdo para salvar
        const hasContent = document.querySelector('input[value], textarea[value], select[value]');
        if (hasContent) {
            saveAnswers();
        }
    }, 30000);
    
    // Salvar antes de sair da página
    window.addEventListener('beforeunload', function() {
        saveAnswers();
    });
});

// Função para mostrar dicas contextuais
function showHint(questionNumber) {
    const hints = {
        4: "Pense em 'dose de referência' como um limite de segurança estabelecido por especialistas.",
        5: "A dose de referência é como um 'limite de velocidade' para substâncias químicas no corpo.",
        7: "Risco crônico refere-se aos efeitos que aparecem após exposição prolongada, não imediata.",
        9: "Compare os percentuais calculados para identificar qual metal teve maior excesso.",
        10: "Mesmo concentrações baixas podem ser perigosas se o limite de segurança for muito baixo."
    };
    
    if (hints[questionNumber]) {
        alert(`Dica: ${hints[questionNumber]}`);
    }
}

// Adicionar botões de dica para perguntas específicas
document.addEventListener('DOMContentLoaded', function() {
    const questionsWithHints = [4, 5, 7, 9, 10];
    
    questionsWithHints.forEach(qNum => {
        const questionDiv = document.querySelector(`label[for="q${qNum}"]`);
        if (questionDiv) {
            const hintButton = document.createElement('button');
            hintButton.textContent = '💡 Dica';
            hintButton.type = 'button';
            hintButton.style.marginLeft = '10px';
            hintButton.style.fontSize = '0.8em';
            hintButton.style.padding = '5px 10px';
            hintButton.onclick = () => showHint(qNum);
            questionDiv.appendChild(hintButton);
        }
    });
});

