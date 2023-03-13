import React, { useState, useEffect } from 'react'
import './register.css'
import Facebook from './icons/facebook.svg'
import Apple from './icons/apple.svg'
import Google from './icons/google.svg'




const Register = () => {



  interface FormState {
    email: string;
    password: string;
    phone: string;
  }

  const initialFormState: FormState = {
    email: '',
    password: '',
    phone: '',
  };


  interface FormErrors {
    email?: string;
    password?: string;
    phone?: string;
  }

  const initialFormErrors: FormErrors = {};

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
  const [isError, setIsError] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const errors: FormState = {
      email: '',
      password: '',
      phone: '',
    };

    // Validar el campo de correo electrónico
    if (!formState.email) {
      setIsError(true);
      /* errors.email = 'El correo electrónico es requerido'; */
    } else if (
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formState.email)
    ) {
      setIsError(true);
      errors.email = 'El correo electrónico no es válido';
    } else {
      setIsError(false);
      errors.email = 'Correo válido';
    }

    // Validar el campo de contraseña
    if (!formState.password) {
      setErrorPassword(true);
      /*  errors.password = 'La contraseña es requerida'; */
    } else if (/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formState.password) === false) {
      setErrorPassword(true);
      errors.password = 'La contraseña debe tener al menos 8 caracteres, una mayuscula y un numero';
    } else {
      setErrorPassword(false);
      errors.password = "Contraseña permitida"
    }

    // Validar el campo de teléfono
    if (!formState.phone) {
      setErrorPhone(true);
      /* errors.phone = 'El teléfono es requerido'; */
    } else if (!/^[0-9]{10}$/.test(formState.phone)) {
      setErrorPhone(true);
      errors.phone = 'El teléfono debe tener 10 dígitos';
    } else {
      setErrorPhone(false);
      errors.phone = "Numero permitido"
    }

    /* if ( !formState.email  || !formState.password || !formState.phone) {
      errors.email = 'El correo electrónico es requerido'
      errors.password = 'La contraseña debe tener al menos 8 caracteres, una mayuscula y un numero';
      errors.phone = 'El teléfono debe tener 10 dígitos';
    } */




    if (errors.email === '' && errors.password === '' && errors.phone === '') {
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  }, [formState]);




  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {


    event.preventDefault();

    /* if (!formState.email || !formState.password || !formState.phone) {
      alert('Todos los campos son obligatorios');
      return; */


    // Si no hay errores de validación, puedes hacer lo que necesites con los datos del formulario
    console.log(formState);
  };













  return (
    <div className='main-register'>
      <h3>Creá una cuenta</h3>
      <div className="button-container">
        <button><img src={Google} alt="" className='register-icon' /> Continuar con Google</button>
        <button> <img src={Apple} alt="" className='register-icon' /> Continuar con Apple</button>
        <button> <img src={Facebook} alt="" className='register-icon' /> Continuar con Facebook</button>
        <hr></hr>
      </div>




      <form onSubmit={handleSubmit}>
        <div className="input-container">

          <input
            type="email"
            placeholder='Email'
            className='email'
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          />
          {/* {formErrors.email && <span className='incorrect-Message'>{formErrors.email}</span>} */}
          <span className={isError ? 'error-message' : 'valid-message'}>
            {formErrors.email}
          </span>

          <input
            id='password'
            type="password"
            placeholder='Contraseña'
            name="password"
            value={formState.password}
            onChange={handleChange}
            minLength={8} required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
          />
          {/* {formErrors.password && <span className='incorrect-Message'>{formErrors.password}</span>} */}
          <span className={errorPassword ? 'error-message2' : 'valid-message2'}>
            {formErrors.password}
          </span>


          <input
            type="tel"
            placeholder='Teléfono'
            id="phone"
            name="phone"
            value={formState.phone}
            onChange={handleChange}
            pattern="^\d{10}$" required


          />
          <span className={errorPhone ? 'error-message2' : 'valid-message2'}>
            {formErrors.phone}
          </span>

          <div className="politicy-check">

            <input type="checkbox" name="" id="" required />
            <p>Al crear tu cuenta, estás aceptando los términos de servicio y la politíca de privacidad de DON</p>
          </div>
        </div>
        <hr />
        <div className="button-creation">
          <button type='submit'>Creá tu cuenta</button>
          <p>¿Ya estás registrado en DON? Ingresá</p>
        </div>
      </form>

    </div>
  )
}


export default Register