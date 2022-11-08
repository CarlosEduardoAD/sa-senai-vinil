import i18n from '../../i18n';

const translate = i18n.t

export const formDataFields = [
    {
        id: 1,
        name: 'firstName',
        label: translate('PrimeiroNome'),
        placeholder: translate('Joao'),
        type: 'text',
    },
    {
        id: 2,
        name: 'lastName',
        label: translate('Sobrenome'),
        placeholder: translate('Silva'),
        type: 'text',
    },
    {
        id: 3,
        name: 'email',
        label: 'Email',
        placeholder: translate('ExemploGmail'),
        type: 'email',
    },
    {
        id: 4,
        name: 'age',
        label: translate('Idade'),
        placeholder: 'Age',
        type: 'text',
    },
    {
        id: 5,
        name: 'phone',
        label: translate('Telefone'),
        type: 'tel',
    }
    ,
    {
        id: 6,
        name: 'address',
        label: translate('Endereco'),
        placeholder: translate('Endereco'),
        type: 'text',
    }

]
