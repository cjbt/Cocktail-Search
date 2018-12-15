import React, { Component } from 'react';
import Card from './Card'

class Home extends Component {
  render() {
    return (
      <div>
       {/* <Grid container spacing={24}>
       {data.length === 0 ? 'No DATA YET' : data.drinks.map(drink => 
          <Grid key={drink.idDrink} item xs={12} sm={6} md={3}>
         <Card 
           key={drink.idDrink}
           title={drink.strDrink}
           category={drink.strCategory}
           description={drink.strInstructions}
           img={drink.strDrinkThumb}
           date={drink.dateModified}
         />
         </Grid>
         )}
       </Grid> */}
      </div>
    );
  }
}

export default Home;
