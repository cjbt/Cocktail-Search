import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Card from './Card'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,

  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class NavBar extends Component {
  state = {
    searchTerm: "",
    data: [],
  }
  componentDidMount(){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then(res => res.json())
    .then(data => this.setState({ data }))
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  getData = (e) =>{
    e.preventDefault();
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.searchTerm}`)
    .then(res => res.json())
    .then(data => this.setState({ data }))
  }
  render(){
    const { classes } = this.props;
    const { data } = this.state;
    console.log(data);
    return( <div className={classes.root}>
          <AppBar position="static">
               <Toolbar>
                 <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                   <MenuIcon />
                 </IconButton>
                 <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                   Cocktails
                 </Typography>
                 <div className={classes.grow} />
                 <div className={classes.search}>
                   <div className={classes.searchIcon}>
                     <SearchIcon />
                   </div>
                   <form onSubmit={this.getData}>
                    <InputBase
                      placeholder="Search…"
                      onChange={
                        this.handleChange
                      }
                      name = "searchTerm"
                      value = {
                        this.state.searchTerm
                      }
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                    />
                  </form>
                </div>
              </Toolbar>
            </AppBar>
            <Grid container spacing={24}>
       
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
            </Grid>
          </div>)
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);