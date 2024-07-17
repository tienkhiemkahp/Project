import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createLichSuDangKy, updateLichSuDangKy } from './LichSuDangKyServices';
import { code } from 'src/const';
import { toast } from 'react-toastify';

export default function LichSuDangKyDialog({ open, handleClose, item, updateData }) {
  const [value, setValue] = React.useState(null);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setValue((pre) => ({ ...pre, [name]: value }));
  };

  React.useEffect(() => {
    setValue({ ...item });
  }, []);

  let convertDataSubmit = (data) => {
    return {
      idLichSuDangKy: data?.idLichSuDangKy,
      tenLoaiLichSuDangKy: data?.tenLoaiLichSuDangKy,
      tileGiamHocPhi: data?.tileGiamHocPhi,
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if (value?.idLichSuDangKy) {
        let data = await updateLichSuDangKy(payload);
        if (data?.status === code.success) {
          toast.success('Cập nhật thành công.');
        }
      } else {
        let data = await createLichSuDangKy(payload);
        if (data?.status === code.success) {
          toast.success('Thêm mới thành công.');
        }
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra.');
    } finally {
      handleClose();
      updateData();
    }
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleFormSubmit();
          },
        }}
      >
        <DialogTitle>{value?.idLichSuDangKy ? 'Cập nhật' : 'Thêm mới'} đối tượng</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="tenLoaiLichSuDangKy"
            label="Tên loại đối tượng"
            value={value?.tenLoaiLichSuDangKy}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            type="number"
            margin="dense"
            name="tileGiamHocPhi"
            label="Tỉ lệ giảm học phí"
            value={value?.tileGiamHocPhi}
            onChange={handleChange}
            fullWidth
            inputProps={{
              min: 0,
              max: 100,
            }}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Lưu</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
