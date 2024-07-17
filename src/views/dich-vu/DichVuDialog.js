import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createDichVuNguoiDung, updateDichVuNguoiDung } from './DichVuServices';
import { code, convertDate, statusService, typeService, typeServiceTxt } from 'src/const';
import { toast } from 'react-toastify';
import { Autocomplete } from '@mui/material';

export default function DichVuDialog({ open, handleClose, item, updateData, listNguoiDung = [] }) {
  const [value, setValue] = React.useState({});

  const handleChange = (e, source) => {
    if (source) {
      setValue((pre) => ({ ...pre, [source]: e }));
    } else {
      let { name, value } = e.target;
      setValue((pre) => ({ ...pre, [name]: value }));
    }
  };

  React.useEffect(() => {
    setValue((pre) => ({
      ...pre,
      ...item,
      ngayTao: convertDate(item?.ngayTao),
      ngayCapNhat: convertDate(item?.ngayCapNhat),
      nguoiDung: listNguoiDung?.find((i) => i?.maNguoiDung === item?.maNguoiDung),
      loaiDichVu: item?.loaiDichVu === typeService[0] ? typeServiceTxt[0] : typeServiceTxt[1],
    }));
  }, []);

  let convertDataSubmit = (data) => {
    return {
      maDichVu: data?.maDichVu,
      maNguoiDung: data?.nguoiDung?.maNguoiDung,
      loaiDichVu: data?.loaiDichVu === typeServiceTxt[0] ? typeService[0] : typeService[1],
      trangThaiDichVu: data?.loaiDichVu === typeServiceTxt[0] ? statusService[0] : statusService[1],
      ngayTao: data?.ngayTao,
      ngayCapNhat: data?.ngayCapNhat,
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if (value?.maDichVu) {
        let data = await updateDichVuNguoiDung(payload);
        if (data?.status === code.success) {
          toast.success('Cập nhật thành công.');
        }
      } else {
        let data = await createDichVuNguoiDung(payload);
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
        <DialogTitle>{value?.maDichVu ? 'Cập nhật' : 'Thêm mới'} dịch vụ</DialogTitle>
        <DialogContent>
          <Autocomplete
            variant="standard"
            id="combo-box-demo"
            options={listNguoiDung || []}
            value={
              value?.nguoiDung || listNguoiDung?.find((i) => i?.maNguoiDung === item?.maNguoiDung)
            }
            getOptionLabel={(option) => option.hoTen}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'nguoiDung')}
            renderInput={(params) => (
              <TextField {...params} label="Người dùng" variant="standard" />
            )}
          />
          <Autocomplete
            variant="standard"
            id="combo-box-demo"
            options={typeServiceTxt}
            value={value?.loaiDichVu || item?.loaiDichVu}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'loaiDichVu')}
            renderInput={(params) => (
              <TextField {...params} label="Loại dịch vụ" variant="standard" />
            )}
          />
          <TextField
            required
            type="date"
            margin="dense"
            name="ngayTao"
            label="Ngày tạo"
            value={value?.ngayTao || new Date()}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            type="date"
            margin="dense"
            name="ngayCapNhat"
            label="Ngày cập nhật"
            value={value?.ngayCapNhat || new Date()}
            onChange={handleChange}
            fullWidth
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
