import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, MenuItem, Menu, Button, Grow, Paper, Popper, MenuList, ClickAwayListener } from '@material-ui/core';

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
    },
    secondRoot: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    content: {
      top: '0px',
      right: '250px'
    }
  }),
);

const options: string[] = [
  'Выбрать страну',
  'Выбрать регион',
  'Выбрать город',
];

const data: string[] = [
  '1111',
  '2222',
  '3333',
];

export const SortDropdown = ({ text }) => {
  const classes: any = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<string | number>('Выбрать страну');

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    // dasssssnew
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const onClose = (event, index) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setSelectedIndex(index);
    setAnchorEl(null);
    setOpen(false);
    const currentElement = event.target.outerText;
    setSelectedIndex(currentElement);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

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
          <ListItemText primary={text} secondary={selectedIndex} className={classes.text} />
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
            className={classes.text}
          >
            <>
              <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                {option}
              </Button>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal className={classes.content}>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom', }}
                  >
                    <Paper>
                      {data.map((element) => {
                        return (
                          <div key={element}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                              <MenuItem onClick={(event) => onClose(event, index)} selected={index === selectedIndex}>
                                {element}
                              </MenuItem>
                            </MenuList>
                          </div>
                        );
                      })}
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default React.memo(SortDropdown);
