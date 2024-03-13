import React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";

const BasicPopover = ({ buttonStyle, content, buttonText, buttonSize }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        style={buttonStyle} // Apply the buttonStyle prop here
      >
        {buttonText}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
      >
        {content}
      </Popover>
    </div>
  );
};

export default BasicPopover;