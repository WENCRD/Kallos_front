import { useState } from 'react';
import UsersService from '../Services/UsersService';
import { useNavigate } from 'react-router-dom';

const SignInModal = ({ children, onClose }) => {
    const navigate = useNavigate();
    //   const [Users, setUsers] = useState([]);

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [phone, setphone] = useState("");
    const [sex, setsex] = useState("");
    const [adress, setadress] = useState("");
    const [postal_code, setpostal_code] = useState("");
    const [date_of_birth, setdate_of_birth] = useState("");
    const [type, settype] = useState("");
    const [city, setcity] = useState("");
    const [username, setusername] = useState("");



    const handleSubmit = async (e) => {
        console.log("test");
        e.preventDefault();
        console.log('Connexion avec:', { email, password });

        try {
            console.log(username,email, password, first_name, last_name, sex, city, adress, postal_code, phone, date_of_birth, type);
            //  mettre a la place de booking service page profil ?
            const response = await UsersService.getSign({
                email,
                password,
                first_name,
                sex,
                city,
                adress,
                postal_code,
                phone,
                date_of_birth,
                last_name,
                type,
                username

            });
            console.log(response.data);
            // mettre la navigate vers profil
            console.log("Fermeture du modal déclenchée");
            onClose(); 
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };


    // État pour suivre la section actuelle
    const [currentSection, setCurrentSection] = useState(1);
    // Passer à la section suivante
    const handleNext = () => {
        setCurrentSection((prevSection) => prevSection + 1);
    };

    const handlePrevious = () => {
        setCurrentSection((prevSection) => Math.max(prevSection - 1, 1)); // Revenir à la section précédente
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="btn-close" onClick={() => onClose("Le module est fermé")}>
                    &times;
                </button>

                {currentSection === 1 && (
                    <>
                      
                        <h2>INSCRIPTION</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label name="email" >E-mail*</label>
                                    <input required={true} onChange={(e) =>
                                        setemail(e.target.value)}
                                        value={email}
                                        type="email" id="email" placeholder="Votre e-mail" />
                                </div>
                                <div className="form-group">
                                    <label
                                        name="account-type">Type de compte*</label>
                                    <select required={true} onChange={(e) =>
                                        settype(e.target.value)}
                                        value={type}
                                        id="account-type">
                                        <option value="admin">Sélectionner</option>
                                        <option value="mannequin">Mannequin</option>
                                        <option value="photographe">Photographe</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label
                                        name="password" >Saisissez votre mot de passe*</label>
                                    <input required={true} onChange={(e) =>
                                        setpassword(e.target.value)}
                                        value={password}
                                        type="password" id="password" placeholder="Mot de passe" />
                                </div>
                                <div className="form-group">
                                    <label
                                        name="confirm-password">Confirmer votre mot de passe*</label>
                                    <input required={true} onChange={(e) =>
                                        setpassword(e.target.value)}
                                        value={password}
                                        type="password" id="confirm-password" placeholder="Confirmer mot de passe" />
                                </div>
                            </div>
                        
                            <div className="form-navigation">
                                <button type="button" className="btn" onClick={handleNext}>
                                    Suivant
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {currentSection === 2 && (
                    <>
                      <h2>Informations Personnelles</h2>
                       <form onSubmit={handleSubmit}>
                            <div className="form-row">
                            <div className="form-group">
                                    <label name="username">Username*</label>
                                    <input required onChange={(e) =>
                                        setusername(e.target.value)}
                                        value={username}
                                        type="text" id="name" placeholder="Votre nom" />
                                </div>

                                <div className="form-group">
                                    <label name="name">Nom*</label>
                                    <input required onChange={(e) =>
                                        setfirst_name(e.target.value)}
                                        value={first_name}
                                        type="text" id="name" placeholder="Votre nom" />
                                </div>
                     
                               

                                <div className="form-group">
                                    <label name="firstname">Prénom*</label>
                                    <input required={true} onChange={(e) =>
                                        setlast_name(e.target.value)}
                                        value={last_name}
                                        type="text" id="firstname" placeholder="Votre prénom" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label
                                        name="dob"
                                    >Date de naissance*</label>
                                    <input required={true} onChange={(e) =>
                                        setdate_of_birth(e.target.value)}
                                        value={date_of_birth}
                                        type="date" id="dob" />
                                </div>
                                <div className="form-group">
                                    <label 
                                        name="gender">Sexe*</label>
                                    <select required={true} onChange={(e) => 
                                        setsex(e.target.value)}
                                         value={sex}
                                        id="gender">
                                        <option value="">Sélectionner</option>
                                        <option value="homme">male</option>
                                        <option value="femme">female</option>
                                        <option value="sans-genre">non-binary</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label
                                        name="phone"  >Numéro de téléphone*</label>
                                    <input required={true} onChange={(e) =>
                                        setphone(e.target.value)}
                                        value={phone}
                                        type="tel" id="phone" placeholder="+33" />
                                </div>
                                <div className="form-group">
                                    <label
                                        name="model-type"  >Type de modèle*</label>
                                    <input required={true} onChange={(e) =>
                                        settype(e.target.value)}
                                        value={type}
                                        type="text" id="model-type" placeholder="Votre type de modèle" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label
                                        name="address" >Adresse*</label>
                                    <input required={true} onChange={(e) =>
                                        setadress(e.target.value)}
                                        value={adress}
                                        type="text" id="address" placeholder="Votre adresse" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label
                                        name="city"  >Ville*</label>
                                    <input required={true} onChange={(e) =>
                                        setcity(e.target.value)}
                                        value={city}
                                        type="text" id="city" placeholder="Votre ville" />
                                </div>
                                <div className="form-group">
                                    <label
                                        name="zipcode">Code Postal*</label>
                                    <input required={true} onChange={(e) =>
                                        setpostal_code(e.target.value)}
                                        value={postal_code}
                                        type="text" id="zipcode" placeholder="Votre code postal" />
                                </div>
                            </div>
                            <div className="form-terms">
                                <label>
                                    <input type="checkbox" id="terms" />
                                    J'accepte les <a href="#">conditions générales</a>.
                                </label>
                            </div>
                            <div className="form-navigation">
                                <button type="button" className="btn" onClick={handlePrevious}>
                                    Précédent
                                </button>
                                <button type="button" className="btn" onClick={handleNext}>
                                    Suivant
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {currentSection === 3 && (
                    <>
                    <form onSubmit={handleSubmit}> 
                        <h2>INSCRIPTION</h2>
                        <h3>Confirmation</h3>
                        <p>Merci de vérifier vos informations avant de soumettre.</p>
                        <div className="form-navigation">
                            <button type="button" className="btn" onClick={handlePrevious}>
                                Précédent
                            </button>
                            <button type="submit" className="btn" onClick={onClose()}>
                                Terminer
                            </button>
                        </div>
                   </form> 
                   </>
                    
                )}
                
            </div>

        </div>
    );
};

export default SignInModal;
