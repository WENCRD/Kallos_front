import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const PhotographerCard = ({ photographer }) => {
  const navigate = useNavigate();

  const navigateTo = (id_photographer) => {
    navigate(`/photographes/${id_photographer}`);
  };

  return (
    <div className='PhotographerCard'>
      <Card style={{ width: '20rem', cursor: 'pointer' }} onClick={() => navigateTo(photographer.id_photographer)}>
        <Card.Img 
          className='card-img' 
          variant="top" 
          src={`/src/img/${photographer.image_url || "Kallos_Vision Logo.png"}`} 
          alt={`Photo de ${photographer.username || 'ce photographe'}`}
        />
        <Card.Body>
          <Card.Title>{photographer.username ||"Nom inconnu"}</Card.Title>
          <Card.Text>
            <strong>Localisation :</strong> {photographer.specialty || "Non précisé"} <br />
            <strong>Expérience :</strong> {photographer.experience_years || "Non précisé"} ans <br />
            <strong>Localisation :</strong> {photographer.location || "Non précisé"}         
          </Card.Text>
          <Button className='card-btn' onClick={(e) => { e.stopPropagation(); navigateTo(photographer.id_photographer); }}>
            Voir le profil
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PhotographerCard;
