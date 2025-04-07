import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const MannequinCard = ({ mannequin }) => {
  const navigate = useNavigate();

  const navigateTo = (id_mannequin) => {
    navigate(`/mannequin/${id_mannequin}`);
  };

  return (
    <div className='MannequinCard'>
      <Card style={{ width: '20rem', cursor: 'pointer' }} onClick={() => navigateTo(mannequin.id_mannequin)}>
        <Card.Img 
          className='card-img' 
          variant="top" 
          src={`/src/img/${mannequin.image_url || "Kallos_Vision Logo.png"}`} 
          alt={`Photo de ${mannequin.username || 'ce mannequin'}`}
        />
        <Card.Body>
          <Card.Title>{mannequin.username || "Nom inconnu"}</Card.Title>
          <Card.Text>
            <strong>Taille :</strong> {mannequin.height} cm <br />
            <strong>Yeux :</strong> {mannequin.eye_color} <br />
            <strong>Cheveux :</strong> {mannequin.hair_color} <br />
            <strong>Localisation :</strong> {mannequin.location}
          </Card.Text>
          <Button className='card-btn' onClick={(e) => { e.stopPropagation(); navigateTo(mannequin.id_mannequin); }}>
            Voir le profil
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MannequinCard;
