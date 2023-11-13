import Info from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import React, {
  ForwardedRef,
  forwardRef,
  Fragment,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import { pxToRem } from "utils/getFontValue";

import * as fonts from "theme/fonts";

type Props = { description: FieldDescriptionType };

export type FieldDescriptionRef = Optional<{
  toggle: (el: HTMLButtonElement) => void;
}>;

const FieldDescription = forwardRef(function FieldDescription(
  { description: _description }: Props,
  ref: ForwardedRef<FieldDescriptionRef>
) {
  const id = React.useId();

  const description = useMemo(() => {
    if (Array.isArray(_description)) return _description;
    return [_description];
  }, [_description]);

  const [{ open, anchorEl }, setState] = useState({
    open: false,
    anchorEl: null,
  });

  useImperativeHandle(ref, () => {
    return {
      toggle: (anchorEl) => {
        setState((state) => ({ ...state, open: !state.open, anchorEl }));
      },
    };
  });
  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      transition
      sx={{
        zIndex: 10001,
      }}
      modifiers={[
        {
          name: "arrow",
          enabled: true,
        },
      ]}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <span>
            <PopperPaper>
              <Box component="span" className="arrow" data-popper-arrow />
              <ClickAwayListener
                onClickAway={() =>
                  setState((state) => ({
                    ...state,
                    open: false,
                    anchorEl: null,
                  }))
                }
              >
                <div>
                  {description.map((description, index) => (
                    <Description key={index} description={description} />
                  ))}
                </div>
              </ClickAwayListener>
            </PopperPaper>
          </span>
        </Fade>
      )}
    </Popper>
  );
});

type DescriptionProps = { description: FieldDescriptionType };
const Description = ({ description }: DescriptionProps) => {
  return (
    <Typography variant="body1" fontFamily={fonts.poppins.fontFamily}>
      {description}
    </Typography>
  );
};

type FieldDescriptionIconProps = { description: Props["description"] };
export const FieldDescriptionIcon = ({
  description,
}: FieldDescriptionIconProps) => {
  const ref = useRef<Optional<FieldDescriptionRef>>(null);
  const buttonRef = useRef<Optional<HTMLButtonElement>>(null);

  if (!description) return null;

  const onClick = (e: React.BaseSyntheticEvent<any>) => {
    if (!ref.current) return;
    ref.current.toggle(e.currentTarget);
  };

  return (
    <Fragment>
      <FieldDescription ref={ref} description={description} />
      <IconButton onClick={onClick} size="small" color="info" ref={buttonRef}>
        <Info />
      </IconButton>
    </Fragment>
  );
};

const PopperPaper = styled(Paper)(({ theme: { palette, alpha } }) => {
  const background = palette.grey[800];
  return {
    background,
    userSelect: "none",
    color: palette.grey[200],
    maxWidth: 500,
    paddingLeft: pxToRem(7),
    paddingRight: pxToRem(7),
    paddingTop: pxToRem(12),
    paddingBottom: pxToRem(12),
    ".arrow": {
      position: "absolute",
      marginTop: pxToRem(-14 - 5),
      borderLeft: "6px solid transparent",
      borderRight: "6px solid transparent",
      borderBottom: `6px solid  ${alpha(background, 0.7)}`,
    },
  };
});
