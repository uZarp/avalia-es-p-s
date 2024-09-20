// Função para simular a chegada de uma nova notificação de pesquisa de satisfação
function showSurveyNotification() {
  document.getElementById('notification-popup').style.display = 'block';
}

// Função para abrir o formulário de pesquisa
document.getElementById('open-survey').addEventListener('click', function() {
  document.getElementById('notification-popup').style.display = 'none';
  document.getElementById('survey-form').style.display = 'block';
});

// Função para lidar com o envio do formulário
document.getElementById('feedback-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Coleta dos dados do formulário
  const surveyData = {
    cnpj: document.getElementById('cnpj').value,
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    rating: document.querySelector('input[name="rating"]:checked').value,
    feedback: document.getElementById('feedback').value
  };

  // Simulação de armazenamento e envio para outro sistema (ex: pós-venda)
  storeSurveyData(surveyData);
  sendNotificationToPostSales(surveyData);

  // Fecha o formulário de pesquisa
  document.getElementById('survey-form').style.display = 'none';
  alert("Avaliação enviada com sucesso!");
});

// Função que simula o armazenamento de dados
function storeSurveyData(data) {
  console.log("Dados armazenados:", data);
  // Aqui poderia ser feita uma chamada a uma API para armazenar esses dados em um banco de dados real
}

// Função que simula o envio de uma notificação para outro sistema (ex: pós-venda)
function sendNotificationToPostSales(data) {
  console.log(`Notificação: A avaliação do cliente ${data.name} foi recebida.`);
  // Aqui poderia ser feita uma chamada a uma API para notificar outro sistema sobre a avaliação
}

// Função de "Lembrar novamente mais tarde"
document.getElementById('remind-later').addEventListener('click', function () {
  // Esconde a notificação
  document.getElementById('notification-popup').style.display = 'none';

  // Define um tempo (por exemplo, 15 minutos) para mostrar a notificação novamente
  const remindLaterTime = 1 * 60 * 100; // 15 minutos em milissegundos
  setTimeout(showSurveyNotification, remindLaterTime);
});

// Funcão do botão X para fechar o campo de pesquisa

document.getElementById('close-notification').addEventListener('click', function () {
  document.getElementById('notification-popup').style.display = 'none';
});


// Simula a geração de uma notificação após 5 segundos
setTimeout(showSurveyNotification, 5000);

// Simulação de uma nova notificação a cada 60 segundos
setInterval(showSurveyNotification, 60000);

// Função para aplicar máscara de CNPJ enquanto o usuário digita
function maskCNPJ(value) {
  value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  value = value.replace(/^(\d{2})(\d)/, '$1.$2'); // Adiciona ponto após os dois primeiros dígitos
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Adiciona ponto após os próximos três dígitos
  value = value.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Adiciona barra após os próximos três dígitos
  value = value.replace(/(\d{4})(\d)/, '$1-$2'); // Adiciona traço após os quatro dígitos
  return value;
}

// Função para validar CNPJ
function validateCNPJ(cnpj) {
  const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  return regex.test(cnpj);
}

// Aplica a máscara enquanto o usuário digita no campo CNPJ
document.getElementById('cnpj').addEventListener('input', function (e) {
  this.value = maskCNPJ(this.value);
});

// Validação do campo CNPJ ao perder o foco (quando o usuário sai do campo)
document.getElementById('cnpj').addEventListener('blur', function (e) {
  const cnpj = this.value;
  if (!validateCNPJ(cnpj)) {
    document.getElementById('cnpj-error').textContent = "CNPJ inválido! Insira no formato 00.000.000/0000-00.";
  } else {
    document.getElementById('cnpj-error').textContent = "";
  }
});

// Validação do campo Nome
document.getElementById('name').addEventListener('input', function (e) {
  this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); // Permitir apenas letras e espaços
  if (this.value.length > 40) {
    document.getElementById('name-error').textContent = "Nome não pode exceder 40 caracteres.";
  } else {
    document.getElementById('name-error').textContent = "";
  }
});

// Validação do campo Telefone
document.getElementById('phone').addEventListener('input', function (e) {
  this.value = this.value.replace(/\D/g, ''); // Permitir apenas números
  this.value = formatPhone(this.value); // Formata o número durante a digitação
});

// Função para formatar Telefone
function formatPhone(phone) {
  phone = phone.replace(/\D/g, ""); // Remove tudo que não é dígito
  if (phone.length === 11) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return phone;
}

// Função para validar Telefone
function validatePhone(phone) {
  const regex = /^\(\d{2}\) \d{5}-\d{4}$/; // Valida no formato (XX) XXXXX-XXXX
  return regex.test(phone);
}

// Validação do campo Telefone ao perder o foco (quando o usuário sai do campo)
document.getElementById('phone').addEventListener('blur', function (e) {
  const phone = this.value;
  if (!validatePhone(phone)) {
    document.getElementById('phone-error').textContent = "Telefone inválido! Insira no formato (XX) XXXXX-XXXX.";
  } else {
    document.getElementById('phone-error').textContent = "";
  }
});

// Aplicar a máscara ao entrar no campo Telefone, mantendo o formato correto
document.getElementById('phone').addEventListener('focus', function (e) {
  this.value = formatPhone(this.value);
});

// Formatar e validar o telefone ao carregar a página
window.onload = function () {
  formatAndValidatePhoneOnLoad();
};

// Validação do campo Email
// Função para validar o e-mail
function validateEmail(email) {
  // Regex para verificar se o e-mail possui o formato básico com "@" e um domínio
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validação do campo E-mail ao perder o foco (quando o usuário sai do campo)
document.getElementById('email').addEventListener('blur', function(e) {
  const email = this.value;
  if (!validateEmail(email)) {
    document.getElementById('email-error').textContent = "Email inválido! Insira um email no formato correto (exemplo@dominio.com).";
  } else {
    document.getElementById('email-error').textContent = "";
  }
});

// Validação ao digitar no campo de e-mail
document.getElementById('email').addEventListener('input', function(e) {
  if (this.value.length > 50) {
    document.getElementById('email-error').textContent = "Email não pode exceder 50 caracteres.";
  } else {
    document.getElementById('email-error').textContent = "";
  }
});