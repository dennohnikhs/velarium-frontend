import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import cssStyles from "utils/cssStyles";

const StyledTableContainer = styled(TableContainer)(
  ({ theme: { spacing } }) => ({
    marginTop: spacing(2),
    borderRadius: spacing(1),
    ...cssStyles.glass({
      border: false,
      opacity: 0.65,
    }),
  })
);

const StyledTableCell = styled(TableCell)(({ theme: { palette } }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: palette.common.white,
    color: palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme: { palette } }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export { StyledTableCell, StyledTableContainer, StyledTableRow };
