import React, {useContext} from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import StarsIcon from "@material-ui/icons/Stars";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const ImageCard = ({ pokemonData, onAddFavorite, isFavorite}) => {

  const description = (pokemonData) => {
    const name = pokemonData.name;
    const abilities = (pokemonData) => {
      return (
        <>
          {pokemonData.abilities.map(
            (ability) => ability.ability.name + ", "
          )}
        </>
      );
    };

    const types = (pokemonData) => {
      return (
        <>{pokemonData.types.map((ability) => ability.type.name + ", ")}</>
      );
    };
    return (
      <>
        {name} is a pokemon type {types(pokemonData)} With abilities like{" "}
        {abilities(pokemonData)}
      </>
    );
  };
  return (
    <div className="imageCard">
      <Card sx={{ maxWidth: 200 }}>
        <img alt={pokemonData.name}
          className="image-sprite"
          src={pokemonData.sprites.front_default}
        ></img>
        <StarsIcon
          className={`favorite-icon ${isFavorite ? " active": ""}`}
          fontSize="large"
        ></StarsIcon>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pokemonData.name}
          </Typography>
          <div className="imageCard-description">
            {description(pokemonData)}
          </div>
        </CardContent>

        <CardActions>
          <Button varian="outlined">
            <Link
              to={{
                pathname: `/description/${pokemonData.id}`,
              }}
              target="_blank"
            >
              Learn More
            </Link>
          </Button>
          <div className="imageCard-add-favorite">
            <Button color="primary" size="small"  variant="contained" onClick={() => onAddFavorite(pokemonData, isFavorite)}>
              {isFavorite ? "Remove favorite": "Add favorite"}
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default ImageCard;
