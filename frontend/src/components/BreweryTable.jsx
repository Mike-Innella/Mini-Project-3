import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

function BreweryTable({ items, onEdit, onDelete }) {
  if (!items.length) {
    return (
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography color="text.secondary">No breweries found.</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>City</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Website</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => {
            const type = item.breweryType || item.brewery_type || '';
            const website = item.websiteUrl || item.website_url || item.website || '';
            return (
              <TableRow key={item.id || item._id || `${item.name}-${item.city}`}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.state}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>
                  {website ? (
                    <Link href={website} target="_blank" rel="noreferrer">
                      Visit
                    </Link>
                  ) : (
                    '—'
                  )}
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" gap={1} justifyContent="flex-end" flexWrap="wrap">
                    <Button size="small" variant="outlined" onClick={() => onEdit(item)}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={() => onDelete(item.id || item._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BreweryTable;
