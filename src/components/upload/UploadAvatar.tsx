// @mui
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import isString from "lodash.isstring";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import cssStyles from "utils/cssStyles";
import Iconify from "../Iconify";
//
import Image from "../Image";
import RejectionFiles from "./RejectionFiles";
// type
import { UploadProps } from "./type";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  width: 144,
  height: 144,
  margin: "auto",
  borderRadius: "50%",
  padding: theme.spacing(1),
  border: `1px dashed ${theme.palette.grey[500_32]}`,
}));

const DropZoneStyle = styled("div")({
  zIndex: 0,
  width: "100%",
  height: "100%",
  outline: "none",
  display: "flex",
  overflow: "hidden",
  borderRadius: "50%",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  "& > *": { width: "100%", height: "100%" },
  "&:hover": {
    cursor: "pointer",
    "& .placeholder": {
      zIndex: 9,
    },
  },
});

const PlaceholderStyle = styled("div")(({ theme }) => ({
  display: "flex",
  position: "absolute",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  transition: theme.transitions.create("opacity", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover": { opacity: 0.72 },

  ...cssStyles.glass({
    saturate: 1.5,
  }),
}));

// ----------------------------------------------------------------------

export default function UploadAvatar({
  error,
  file,
  helperText,
  sx,
  labels,
  ...other
}: UploadProps) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    ...other,
  });

  const label = useMemo(() => {
    if (!!labels && labels.new && labels.update) {
      return file ? labels.update : labels.new;
    }

    return file ? "Update photo" : "Upload photo";
  }, [file, labels]);

  return (
    <>
      <RootStyle
        sx={{
          ...((isDragReject || error) && {
            borderColor: "error.light",
          }),
          ...sx,
        }}
      >
        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
          }}
        >
          <input {...getInputProps()} />

          {file && (
            <Image
              alt="avatar"
              src={isString(file) ? file : file.preview}
              sx={{ zIndex: 8 }}
            />
          )}

          <PlaceholderStyle
            className="placeholder"
            sx={{
              ...(file && {
                opacity: 0,
                color: "common.white",
                bgcolor: "grey.900",
                "&:hover": { opacity: 0.72 },
              }),
              ...((isDragReject || error) && {
                bgcolor: "error.lighter",
              }),
              textAlign: "center",
            }}
          >
            <Iconify
              icon={"ic:round-add-a-photo"}
              sx={{ width: 24, height: 24, mb: 1 }}
            />
            <Typography variant="caption">{label}</Typography>
          </PlaceholderStyle>
        </DropZoneStyle>
      </RootStyle>

      {helperText && helperText}

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}
    </>
  );
}
