import React, { useState } from 'react'
import {
  CreditCardContainer,
  CreditCard,
  InputGroup,
  InputsMYCvv,
  TextInformation,
  FlexContainer,
  ErrorContainer,
  ErrorIcon,
  ErrorInput,
  ErrorInputWrapper,
  ErrorMessage,
  BrandsContainer
} from './method-payment-credit-card.style'
import { Input } from 'mondrian-react'
import { IComponentTagging } from '@/services/cro'
import { useTag } from '@/hooks/tag'
import { theme } from '@/styles/theme'
import BrandCreditCard from '@/components/common/brand-credit-card/brand-credit-card.component'
import {
  jcbCard,
  elosvg,
  hipercardsvg,
  masterCardSvg,
  visasvg,
  chip
} from '@/assets'
import { StaticImageData } from 'next/image'
import creditCardType from 'credit-card-type'
import { useAtom } from 'jotai'
import { personalDataAtom } from '@/stores/personal-data/personal-data.hook'

type MethodPaymentCreditCardProps = {
  onInputChange: (field: string, value: string) => void
} & IComponentTagging

const MethodPaymentCreditCard: React.FC<MethodPaymentCreditCardProps> = ({
  onInputChange,
  tagging
}) => {
  const { handleTaggingFieldFocus, handleTaggingFieldBlurAndFill } = useTag(tagging.category)
  const [errorFeedback, setErrorFeedback] = useState('')
  const [errorFeedbackDate, setErrorFeedbackDate] = useState('')
  const [personalDataProps, setPersonalDataProps] = useAtom(personalDataAtom);
  const allowedBrands = ['VISA', 'MASTERCARD', 'JCB', 'ELO', 'HIPERCARD']
  const [cardDetails, setCardDetails] = useState({
    bandeira: '',
    number: '',
    holder: '',
    securityCode: '',
    expiration: ''
  })
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const brandImages: { [key: string]: StaticImageData } = {
    ELO: elosvg,
    HIPERCARD: hipercardsvg,
    MASTERCARD: masterCardSvg,
    VISA: visasvg,
    JCB: jcbCard
  }

  const [isFlipped, setIsFlipped] = useState(false)

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .slice(0, 19)
      .trim()
  }

  const formatExpiryDate = (value: string) => {
    let cleanedValue = value.replace(/\D/g, '')
    if (cleanedValue.length > 6) {
      cleanedValue = cleanedValue.slice(0, 6)
    }
    if (cleanedValue.length >= 2) {
      return cleanedValue.slice(0, 2) + '/' + cleanedValue.slice(2)
    }
    return cleanedValue
  }

  const formatCVV = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 3)
  }

  const handleCardNumberChange = (value: string) => {
    const formattedNumber = formatCardNumber(value)

    if (formattedNumber === '') {
      setCardDetails(prevState => ({
        ...prevState,
        number: '',
        bandeira: '',
        creditCard: null,
        isInvalidCard: false,
      }))
      setErrorFeedback('')
      onInputChange('number', '')
      onInputChange('bandeira', '')
      return
    }

    const cardInfo = creditCardType(formattedNumber.replace(/\s/g, ''))
    const cardBrand = cardInfo.length > 0 && allowedBrands.includes(cardInfo[0].type.toUpperCase())
      ? cardInfo[0].type.toUpperCase()
      : null
    if (!cardBrand && formattedNumber.length >= 4) {
      setErrorFeedback('No momento, não aceitamos este cartão.')
      setPersonalDataProps({ invalidCard: true });
    } else {
      setErrorFeedback('')
      setPersonalDataProps({ invalidCard: false });
    }

    setCardDetails(prevState => ({
      ...prevState,
      number: formattedNumber,
      bandeira: cardBrand || ''
    }))

    onInputChange('number', formattedNumber)
    onInputChange('bandeira', cardBrand || '')
  }

  const validateExpiryDate = (value: string) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/
    if (value && !regex.test(value)) {
      setErrorFeedbackDate('Formato válido (MM/AAAA)')
      setIsButtonDisabled(true)
    } else {
      setErrorFeedbackDate('')
      setIsButtonDisabled(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    let formattedValue = value

    switch (name) {
      case 'number':
        formattedValue = formatCardNumber(value)
        handleCardNumberChange(value)
        break
      case 'expiration':
        formattedValue = formatExpiryDate(value)
        break
      case 'cvv':
        formattedValue = formatCVV(value)
        break
      default:
        break
    }

    setCardDetails(prevState => ({ ...prevState, [name]: formattedValue }))
    onInputChange(name, formattedValue)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleTaggingFieldBlurAndFill({ e })
    if (e.target.name === 'expiration') {
      validateExpiryDate(e.target.value)
    }
  }

  return (
    <>
      <FlexContainer>
        <CreditCardContainer>
          <CreditCard
            numero={cardDetails.number}
            nome={cardDetails.holder}
            vencimento={cardDetails.expiration}
            isFlipped={isFlipped}
          >
            {!isFlipped && (
              <img
                src={chip.src}
                alt='Chip do cartão'
                style={{
                  position: 'absolute',
                  top: '30px',
                  left: '20px',
                  width: '50px',
                  height: 'auto'
                }}
              />
            )}
            {cardDetails.bandeira && !isFlipped && brandImages[cardDetails.bandeira] && (
              <img
                src={brandImages[cardDetails.bandeira].src}
                style={{
                  position: 'absolute',
                  top: '30px',
                  right: '20px',
                  width: '60px',
                  height: 'auto'
                }}
              />
            )}
            {!isFlipped ? (
              <>
                <div className='card-number'>{cardDetails.number || '0000 0000 0000 0000'}</div>
                <div className='card-name-date'>
                  <span className='card-name'>{cardDetails.holder || 'FULL NAME'}</span>
                  <span className='card-date'>{cardDetails.expiration || 'MM/AAAA'}</span>
                </div>
              </>
            ) : (
              <div className='card-cvv'>
                <span>CVV</span>
                <div>{cardDetails.securityCode || '***'}</div>
              </div>
            )}
          </CreditCard>
          <BrandsContainer>
            <BrandCreditCard />
          </BrandsContainer>
        </CreditCardContainer>

        <div style={{ flex: 2 }}>
          <InputGroup>
            <ErrorInputWrapper>
              <ErrorInput
                id='numero-cartao'
                text
                name='number'
                onChange={handleInputChange}
                onFocus={e => handleTaggingFieldFocus({ e })}
                onBlur={e => handleTaggingFieldBlurAndFill({ e })}
                maxLength={19}
                value={cardDetails.number}
              >
                Número do cartão de crédito
              </ErrorInput>
              {errorFeedback && (
                <ErrorContainer>
                  <ErrorIcon
                    icons={[
                      {
                        name: 'mdn-Icon-circulo-exclamacao',
                        size: 'sm',
                        style: { color: `${theme.colors.color.supportDangerDark}` }
                      }
                    ]}
                  />
                  <ErrorMessage>{errorFeedback}</ErrorMessage>
                </ErrorContainer>
              )}
            </ErrorInputWrapper>
          </InputGroup>
          <InputGroup>
            <Input
              id='nome-cartao'
              text
              name='holder'
              onChange={handleInputChange}
              onFocus={e => handleTaggingFieldFocus({ e })}
              onBlur={e => handleTaggingFieldBlurAndFill({ e })}
              value={cardDetails.holder}
              maxLength={30}
            >
              Nome impresso no cartão
            </Input>
            <TextInformation>Conforme aparece no cartão</TextInformation>
          </InputGroup>
          <InputsMYCvv>
            <ErrorInputWrapper>
              <ErrorInput
                id='vencimento-cartao'
                text
                name='expiration'
                onChange={handleInputChange}
                onFocus={e => handleTaggingFieldFocus({ e })}
                onBlur={handleBlur}
                value={cardDetails.expiration}
                maxLength={7}
              >
                MM/AAAA
              </ErrorInput>
              {errorFeedbackDate && (
                <ErrorContainer>
                  <ErrorIcon
                    icons={[
                      {
                        name: 'mdn-Icon-circulo-exclamacao',
                        size: 'sm',
                        style: { color: `${theme.colors.color.supportDangerDark}` }
                      }
                    ]}
                  />
                  <ErrorMessage>{errorFeedbackDate}</ErrorMessage>
                </ErrorContainer>
              )}
            </ErrorInputWrapper>
            <Input
              id='cvv'
              text
              name='securityCode'
              onFocus={e => {
                setIsFlipped(true)
                handleTaggingFieldFocus({ e })
              }}
              onBlur={e => {
                setIsFlipped(false)
                handleTaggingFieldBlurAndFill({ e })
              }}
              onChange={handleInputChange}
              maxLength={4}
              value={cardDetails.securityCode}
            >
              CVV
            </Input>
          </InputsMYCvv>
        </div>
      </FlexContainer>
    </>
  )
}

export default MethodPaymentCreditCard