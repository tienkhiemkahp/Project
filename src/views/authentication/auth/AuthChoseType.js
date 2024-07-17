import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, Button, Checkbox, Stack } from '@mui/material';

export default function AuthChoseType({ handleChange, value, onOkRegister }) {
  return (
    <Box>
      <Stack mb={3}>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Loại dịch vụ</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
          >
            <FormControlLabel
              control={<Checkbox name="nhac_cho" value={value?.nhac_cho} onChange={handleChange} />}
              label="Nhạc chờ"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="khong_lam_phien"
                  value={value?.khong_lam_phien}
                  onChange={handleChange}
                />
              }
              label="Không làm phiền"
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        onClick={onOkRegister}
        // component={Link}
        // to="/auth/login"
      >
        Hoàn tất đăng ký
      </Button>
    </Box>
  );
}
