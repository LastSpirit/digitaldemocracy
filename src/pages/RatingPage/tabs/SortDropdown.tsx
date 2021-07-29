import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, MenuItem, Menu } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      alignItems: 'center',
      margin: '0',
      marginRight: '15px',
      padding: '5px 20px',
      border: '1px solid  #B0B0B0',
      borderRadius: '16px',
    },
    text: {
      marginRight: '10px',
      textAlign: 'left',
      letterSpacing: '0',
      color: '#7A7A7A',
      fontFamily: 'HelveticaNeueCyr',
      fontSize: '18px',
      fontWeight: '200',
      fontStyle: 'normal',
      lineHeight: '18px',
      padding: '10px',
    }
  }),
);

const options = [
  'Выбрать страну',
  'Выбрать регион',
  'Выбрать город',
];

export const SortDropdown = ({ text }) => {
  const classes: any = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}
        >
          <ListItemText primary={text} secondary={options[selectedIndex]} className={classes.text} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
            className={classes.text}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default React.memo(SortDropdown);
