import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtitle, subtext, item, onRegister, onChangeInput }) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h2" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Box>
      <Stack mb={3}>
        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="hoTen" mb="5px">
          Họ tên
        </Typography>
        <CustomTextField onChange={onChangeInput} id="hoTen" variant="outlined" fullWidth />
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="email"
          mb="5px"
          mt="25px"
        >
          Email
        </Typography>
        <CustomTextField onChange={onChangeInput} id="email" variant="outlined" fullWidth />
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="soDienThoai"
          mb="5px"
          mt="25px"
        >
          Số điện thoại
        </Typography>
        <CustomTextField onChange={onChangeInput} id="soDienThoai" variant="outlined" fullWidth />
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="matKhau"
          mb="5px"
          mt="25px"
        >
          Mật khẩu
        </Typography>
        <CustomTextField onChange={onChangeInput} id="matKhau" variant="outlined" fullWidth />
      </Stack>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        onClick={onRegister}
        // component={Link}
        // to="/auth/login"
      >
        Tiếp tục
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthRegister;
