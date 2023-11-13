import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
// @mui
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import isString from "lodash.isstring";
import { useDropzone } from "react-dropzone";
import { validator } from ".";
//
import Image from "../Image";
import BlockContent from "./BlockContent";
import RejectionFiles from "./RejectionFiles";
// type
import { UploadProps } from "./type";

// ----------------------------------------------------------------------

const DropZoneStyle = styled("div")<{ disabled?: boolean }>(
  ({ theme, disabled }) => ({
    outline: "none",
    overflow: "hidden",
    position: "relative",
    padding: theme.spacing(5, 1),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create("padding"),
    backgroundColor: theme.palette.background.neutral,
    border: `1px dashed ${theme.palette.grey[500_32]}`,
    "&:hover": {
      opacity: disabled ? 1 : 0.72,
      cursor: disabled ? "no-drop" : "pointer",
    },
  })
);

// ----------------------------------------------------------------------
export default function UploadSingleFile({
  error = false,
  file,
  helperText,
  sx,
  accept,
  label,
  ...other
}: UploadProps & { label?: string }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    validator: validator(accept),
    ...other,
    disabled: !!other.disabled,
  });

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(!!other.color && {
            color: `${other.color}.main`,
            borderColor: `${other.color}.light`,
            bgcolor: `${other.color}.lighter`,
          }),
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
          ...(file && {
            padding: "12% 0",
          }),
        }}
      >
        {!!label && !label.includes("undefined") && (
          <Typography
            variant="subtitle2"
            component="p"
            sx={{
              position: "absolute",
              zIndex: 12,
              marginLeft: 1.2,
              marginTop: 1.2,
              display: "block",
              top: 0,
              ...(file && {
                borderRadius: 0.9,
                mixBlendMode: "difference",
                color: "white",
              }),
            }}
          >
            {label}
          </Typography>
        )}
        <input {...getInputProps()} />

        <BlockContent />

        {file && (
          <Image
            alt="file preview"
            src={isString(file) ? file : file.preview}
            sx={{
              top: 8,
              left: 8,
              borderRadius: 1,
              position: "absolute",
              width: "calc(100% - 16px)",
              height: "calc(100% - 16px)",
            }}
          />
        )}
      </DropZoneStyle>

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

      {helperText &&
        (() => {
          if (typeof helperText === "string")
            return <FormHelperText>{helperText}</FormHelperText>;
          return helperText;
        })()}
    </Box>
  );
}
