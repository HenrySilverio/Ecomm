Aqui está um README mais atrativo visualmente, organizado e bem formatado:

🛒 Ecomm - MethodPaymentCreditCard Component

O MethodPaymentCreditCard é um componente React que fornece uma interface para inserção de dados de cartão de crédito. Ele inclui campos para:
	•	Número do cartão
	•	Nome do titular
	•	Data de validade
	•	CVV

Além disso, exibe uma representação visual do cartão, que gira para mostrar o CVV quando o campo correspondente é focado.

🚀 Propriedades (Props)

Prop	Tipo	Descrição
onInputChange	(field: string, value: string) => void	Função chamada ao alterar os campos do formulário.
tagging	object	Objeto para tagueamento de analytics.

🎯 Estado (State)

Estado	Tipo	Descrição
errorFeedback	string	Mensagem de erro para o número do cartão.
errorFeedbackDate	string	Mensagem de erro para a data de validade.
personalDataProps	object	Dados pessoais do usuário.
allowedBrands	string[]	Lista de bandeiras permitidas.
cardDetails	object	Informações do cartão (bandeira, número, titular, CVV, validade).
isButtonDisabled	boolean	Indica se o botão de envio está desabilitado.
brandImages	object	Mapeia bandeiras de cartões para suas imagens.
isFlipped	boolean	Indica se o cartão está girado para exibir o CVV.

🛠️ Funções Principais

Função	Descrição
formatCardNumber(value: string)	Formata o número do cartão adicionando espaços a cada 4 dígitos.
formatExpiryDate(value: string)	Formata a data de validade no formato MM/YYYY.
formatCVV(value: string)	Formata o CVV para um máximo de 3 dígitos.
handleCardNumberChange(value: string)	Lida com mudanças no campo do número do cartão, formatando e validando.
validateExpiryDate(value: string)	Valida o formato da data de validade.
handleInputChange(e: React.ChangeEvent<HTMLInputElement>)	Manipula mudanças em qualquer campo de entrada.
handleBlur(e: React.FocusEvent<HTMLInputElement>)	Manipula o evento de perda de foco para validação da data de validade.

💡 Como Usar

import MethodPaymentCreditCard from './method-payment-credit-card.component';

const handleInputChange = (field: string, value: string) => {
  // Lógica para manipular mudança de input
};

const tagging = {
  category: 'payment'
};

<MethodPaymentCreditCard onInputChange={handleInputChange} tagging={tagging} />;

🎨 Estilos

Este componente utiliza styled-components para estilização. As definições de estilo podem ser encontradas em:

📂 method-payment-credit-card.style.ts

📦 Dependências

O componente depende das seguintes bibliotecas:
	•	🏗 mondrian-react - Para o componente de entrada (Input).
	•	💳 credit-card-type - Para detectar o tipo do cartão de crédito.
	•	🔗 jotai - Para gerenciamento de estado.
	•	🖼 next/image - Para manipulação de imagens estáticas.
	•	🎨 styled-components - Para estilização do componente.

📁 Estrutura de Arquivos

📂 src/components/method-payment-credit-card
 ├── 📄 method-payment-credit-card.component.tsx  # Componente principal
 ├── 🎨 method-payment-credit-card.style.ts       # Estilos com styled-components

✨ Melhorias Futuras
	•	Suporte a mais bandeiras de cartão.
	•	Melhorias na acessibilidade e validação dos campos.
	•	Adição de testes unitários.

Gostou deste projeto? ⭐ Dê um star no repositório e contribua! 🚀

Agora o README está mais organizado, legível e atrativo visualmente, com seções bem estruturadas e ícones para facilitar a leitura! Se quiser mais alguma personalização, me avise. 🚀
