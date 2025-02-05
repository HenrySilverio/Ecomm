Here’s your improved README in English with better structure and visual appeal:

🛒 Ecomm - MethodPaymentCreditCard Component

The MethodPaymentCreditCard component is a React functional component that provides a user interface for entering credit card details. It includes input fields for:
	•	Card Number
	•	Cardholder Name
	•	Expiration Date
	•	CVV

It also displays a visual representation of the credit card, which flips to show the CVV when the CVV input is focused.

🚀 Props

Prop	Type	Description
onInputChange	(field: string, value: string) => void	Function triggered when any input field changes.
tagging	object	Object used for analytics tagging.

🎯 State

State	Type	Description
errorFeedback	string	Error message related to the card number.
errorFeedbackDate	string	Error message related to the expiration date.
personalDataProps	object	Holds personal data properties.
allowedBrands	string[]	Array of allowed credit card brands.
cardDetails	object	Stores credit card details (brand, number, holder, CVV, expiration date).
isButtonDisabled	boolean	Indicates whether the submit button should be disabled.
brandImages	object	Maps credit card brands to their respective images.
isFlipped	boolean	Indicates whether the credit card is flipped to display the CVV.

🛠️ Main Functions

Function	Description
formatCardNumber(value: string)	Formats the card number by adding spaces every 4 digits.
formatExpiryDate(value: string)	Formats the expiration date to MM/YYYY format.
formatCVV(value: string)	Formats the CVV to a maximum of 3 digits.
handleCardNumberChange(value: string)	Handles changes to the card number input, including formatting and validation.
validateExpiryDate(value: string)	Validates the expiration date format.
handleInputChange(e: React.ChangeEvent<HTMLInputElement>)	Handles changes to any input field.
handleBlur(e: React.FocusEvent<HTMLInputElement>)	Handles the blur event for input fields, including expiration date validation.

💡 Usage

import MethodPaymentCreditCard from './method-payment-credit-card.component';

const handleInputChange = (field: string, value: string) => {
  // Handle input change
};

const tagging = {
  category: 'payment'
};

<MethodPaymentCreditCard onInputChange={handleInputChange} tagging={tagging} />;

🎨 Styling

This component uses styled-components for styling. The styles are located in:

📂 method-payment-credit-card.style.ts

📦 Dependencies

The component relies on the following libraries:
	•	🏗 mondrian-react - For the Input component.
	•	💳 credit-card-type - For detecting credit card types.
	•	🔗 jotai - For state management.
	•	🖼 next/image - For handling static images.
	•	🎨 styled-components - For styling the component.

📁 File Structure

📂 src/components/method-payment-credit-card
 ├── 📄 method-payment-credit-card.component.tsx  # Main component file
 ├── 🎨 method-payment-credit-card.style.ts       # Styled-components file

✨ Future Enhancements
	•	Support for additional credit card brands.
	•	Improved accessibility and validation.
	•	Unit tests implementation.

Did you like this project? ⭐ Give it a star and contribute! 🚀

Now your README is more structured, visually appealing, and easy to read! Let me know if you need any further refinements. 🚀
