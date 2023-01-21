import {
  Box,
} from '@mui/material'

export default function Card(props) {
  return (
    <Box>
      {JSON.stringify(props, null, 2)}
    </Box>
  )
}
