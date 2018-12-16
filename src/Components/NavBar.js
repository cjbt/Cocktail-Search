import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ThreeSixtyIcon from "@material-ui/icons/ThreeSixty";
import SearchIcon from "@material-ui/icons/Search";
import Card from "./Card";
import Grid from "@material-ui/core/Grid";
const styles = theme => ({
  root: {
    width: "100%",
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  center: {
    paddingTop: 20,
    justifyContent: "center"
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  label: {
    width: 50
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});
class NavBar extends Component {
  state = {
    searchTerm: "",
    data: [],
    anchorEl: null,
    categories: [],
    categoy: ""
  };
  componentDidMount() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
      .then(res => res.json())
      .then(data => this.setState({ data }));
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
      .then(res => res.json())
      .then(data => this.setState({ categories: data.drinks }));
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  getData = e => {
    e.preventDefault();
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${
        this.state.searchTerm
      }`
    )
      .then(res => res.json())
      .then(data => this.setState({ data }));
  };
  getRandom = () => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
      .then(res => res.json())
      .then(data => this.setState({ data }));
  };
  getCats = e => {
    let drinks = {};
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${
        e.target.value
      }`
    )
      .then(res => res.json())
      // .then(data => this.setState({ data }));
      .then(data => this.getCategoryObj(data));
  };
  getCategoryObj = (data) => {
    let realDrinks = [];
    data.drinks.map( drink => {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`)
      .then(res => res.json())
      .then(data => realDrinks.push(data.drinks[0]));
    });
    console.log(realDrinks)
  }
  getAlcoholic = () => {};
  render() {
    const { classes } = this.props;
    const { data, categories } = this.state;
    console.log(this.state.data);
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              Cocktails
            </Typography>
            <div className={classes.grow} />
            <div>
              <Select
                value={this.state.categoy}
                onChange={this.getCats}
                inputProps={{
                  name: "category",
                  id: "category"
                }}
                className={classes.label}
              >
                {categories.map(category => (
                  <MenuItem
                    key={category.strCategory}
                    color="inherit"
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              {/* <MenuIcon onClick={this.getRandom}/> */}
              <ThreeSixtyIcon
                className={classes.icon}
                onClick={this.getRandom}
              />
            </IconButton>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={this.getData}>
                <InputBase
                  placeholder="Search…"
                  onChange={this.handleChange}
                  name="searchTerm"
                  value={this.state.searchTerm}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </form>
            </div>
          </Toolbar>
        </AppBar>
        <Grid container spacing={24} className={classes.center}>
          {!data.drinks ? (
            <h1 className="no-data">
              Go home, you're drunk. We can't serve you.
            </h1>
          ) : (
            data.drinks.map(drink => (
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
            ))
          )}
        </Grid>
      </div>
    );
  }
}
NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(NavBar);