import i18n from '../../i18n';

const translate = i18n.t

export const cardFormDataFields = [
    {
        id: 1,
        name: 'numeroCartao',
        label: translate('NumeroCartao'),
        placeholder : translate('NumeroCartao'),
        type: 'text',
    },
    {
        id: 2,
        name: 'nomeCartao',
        label: translate('NomeCartao'),
        placeholder: translate('NomeCartao'),
        type: 'text',
    },
    {
        id: 3,
        name: 'cvv',
        label: 'CVV',
        placeholder: "CVV",
        type: 'text',
    },
    {
        id: 4,
        name: 'validade',
        label: translate('DataValidade'),
        placeholder: translate('DataValidade'),
        type: 'text',
    },
]
