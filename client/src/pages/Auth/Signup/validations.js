import * as yup from 'yup'

const validationSchema = yup.object().shape({
    email:yup
        .string()
        .email('Email address not correct')
        .required('Required'),

    password:yup
        .string()
        .min(5,'Minumum 5 character')
        .required('Required'),

    passwordConfirm:
        yup.string()
        .oneOf([yup.ref('password')],'Passwords not match')
        .required('Required'),
})

export default validationSchema