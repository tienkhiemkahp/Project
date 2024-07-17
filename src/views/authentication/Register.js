import React, { useState } from 'react';
import { Grid, Box, Card, Typography, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthRegister from './auth/AuthRegister';
import { toast } from 'react-toastify';
import { convertDate, role } from 'src/const';
import { createDichVuNguoiDung, createNguoiDung } from '../tai-khoan/TaiKhoanServices';
import AuthChoseType from './auth/AuthChoseType';

const Register2 = () => {
  const [value, setValue] = useState({
    khong_lam_phien: false,
    nhac_cho: false,
  });
  const [isNext, setIsNext] = useState(false);

  const handleChangeValue = (event) => {
    let { name, checked } = event.target;
    setValue((pre) => ({ ...pre, [name]: checked }));
  };

  const [item, setItem] = useState({});
  let navigate = useNavigate();

  const handleRegister = async () => {
    try {
      let payload = {
        soDienThoai: item?.soDienThoai,
        matKhau: item?.matKhau,
        email: item?.email,
        hoTen: item?.hoTen,
        soDu: 0,
        vaiTro: role[0],
      };
      const res = await createNguoiDung(payload);
      setItem({ ...res?.data });
      setIsNext(!isNext);

      toast.info('Tiếp tục hoàn tất thông tin để hoàn thành đăng ký tài khoản!');
    } catch (error) {
      toast.error(error?.response?.data || 'Có lỗi xảy ra!');
    }
  };

  const handleOkRegister = async () => {
    try {
      let payload_nhac_cho = {
        maNguoiDung: item?.maNguoiDung,
        loaiDichVu: value?.nhac_cho ? 'nhac_cho' : 'khong_lam_phien',
        trangThaiDichVu: value?.nhac_cho === 'nhac_cho' ? 'kich_hoat' : 'khong_kich_hoat',
        ngayTao: convertDate(new Date()),
      };

      let payload_khong_lam_phien = {
        maNguoiDung: item?.maNguoiDung,
        loaiDichVu: value?.khong_lam_phien ? 'khong_lam_phien' : 'nhac_cho',
        trangThaiDichVu:
          value?.khong_lam_phien === 'khong_lam_phien' ? 'khong_kich_hoat' : 'kich_hoat',
        ngayTao: convertDate(new Date()),
      };

      await createDichVuNguoiDung(payload_nhac_cho);
      await createDichVuNguoiDung(payload_khong_lam_phien);
      toast.success('Đăng ký thành công!');
      navigate('/auth/login');
    } catch (error) {
      toast.error(error?.response?.data || 'Có lỗi xảy ra!');
    }
  };

  const handleChange = (e) => {
    let { id, value } = e.target;
    setItem((pre) => ({ ...pre, [id]: value }));
  };
  return (
    <PageContainer title="Đăng ký">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              {!isNext ? (
                <AuthRegister
                  item={item}
                  onRegister={handleRegister}
                  onChangeInput={handleChange}
                  subtitle={
                    <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        Đã có tài khoản?
                      </Typography>
                      <Typography
                        component={Link}
                        to="/auth/login"
                        fontWeight="500"
                        sx={{
                          textDecoration: 'none',
                          color: 'primary.main',
                        }}
                      >
                        Đăng nhập
                      </Typography>
                    </Stack>
                  }
                />
              ) : (
                <AuthChoseType
                  handleChange={handleChangeValue}
                  value={value}
                  onOkRegister={handleOkRegister}
                />
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Register2;
