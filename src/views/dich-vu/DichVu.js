import React, { useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import MaterialTable from 'material-table';
import { tableOtion } from '../utilities/TableOption';
import { Box, Button } from '@mui/material';
import { BorderColorSharp, CheckBox, CheckBoxOutlineBlank, Delete } from '@mui/icons-material';
import DichVuDialog from './DichVuDialog';
import {
  deleteDichVuNguoiDung,
  getAllDichVuNguoiDung,
  getDichVuNguoiDungByMaNguoiDung,
} from './DichVuServices';
import {
  code,
  convertDate,
  role,
  statusService,
  statusServiceTxt,
  typeService,
  typeServiceTxt,
} from 'src/const';
import ConfirmDialog from 'src/components/dialog/ConfirmDialog';
import { toast } from 'react-toastify';
import { getAllNguoiDung } from '../tai-khoan/TaiKhoanServices';

const DichVu = () => {
  let isRoleNguoiDung = JSON.parse(sessionStorage.getItem('user'))?.vaiTro === role[0];
  let currentUser = JSON.parse(sessionStorage.getItem('user'));
  const [value, setValue] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [item, setItem] = React.useState(null);
  const [listItems, setlistItems] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setItem(null);
  };

  const handleEdit = (rowData = {}) => {
    setItem(rowData);
    setOpen(true);
  };

  const handleDelete = (rowData = {}) => {
    setItem(rowData);
    setOpenDelete(true);
  };

  const handleOke = async () => {
    try {
      await deleteDichVuNguoiDung(item?.maDichVu);
      toast.success('Xóa thành công.');
    } catch (error) {
      toast.error('Có lỗi xảy ra.');
    } finally {
      handleClose();
      getAll();
    }
  };
  const getAll = async () => {
    try {
      if (isRoleNguoiDung) {
        const data = await getDichVuNguoiDungByMaNguoiDung(currentUser?.maNguoiDung);
        if (data?.status === code.success) {
          setlistItems(data?.data);
        }
      } else {
        const data = await getAllDichVuNguoiDung();
        if (data?.status === code.success) {
          setlistItems(data?.data);
        }
      }
    } catch (error) {}
  };

  const getListOptions = async () => {
    try {
      let data = await getAllNguoiDung();
      setValue(data?.data);
    } catch (error) {}
  };
  useEffect(() => {
    getAll();
    getListOptions();
  }, []);
  return (
    <PageContainer title="Dịch vụ" description="">
      <DashboardCard title="Danh sách dịch vụ">
        <MaterialTable
          title={
            isRoleNguoiDung ? (
              ''
            ) : (
              <Button
                onClick={() => handleEdit({})}
                size="small"
                variant="contained"
                color="primary"
              >
                Thêm mới
              </Button>
            )
          }
          columns={[
            {
              title: 'Thao tác',
              field: '',
              hidden: isRoleNguoiDung,
              render: (rowData) => {
                return (
                  <Box sx={{ display: 'flex', gap: 1, cursor: 'pointer' }}>
                    <div onClick={() => handleEdit(rowData)}>
                      <BorderColorSharp fontSize="small" sx={{ color: 'primary.main' }} />
                    </div>
                    <div onClick={() => handleDelete(rowData)}>
                      <Delete fontSize="small" sx={{ color: 'error.main' }} />
                    </div>
                  </Box>
                );
              },
            },
            {
              title: ' ',
              field: '',
              hidden: !isRoleNguoiDung,
              render: (rowData) =>
                rowData?.trangThaiDichVu === statusService[0] ? (
                  <CheckBox />
                ) : (
                  <CheckBoxOutlineBlank />
                ),
            },
            { title: 'Mã người dùng', field: 'maNguoiDung', hidden: isRoleNguoiDung },
            {
              title: 'Loại dịch vụ',
              field: 'loaiDichVu',
              render: (rowData) =>
                rowData?.loaiDichVu === typeService[0] ? typeServiceTxt[0] : typeServiceTxt[1],
            },
            {
              title: 'Trạng thái dịch vụ',
              field: 'trangThaiDichVu',
              render: (rowData) =>
                rowData?.trangThaiDichVu === statusService[0]
                  ? statusServiceTxt[0]
                  : statusServiceTxt[1],
            },
            {
              title: 'Ngày tạo',
              field: 'ngayTao',
              render: (rowData) => convertDate(rowData?.ngayTao, true),
            },
            {
              title: 'Ngày cập nhật',
              field: 'ngayCapNhat',
              render: (rowData) => convertDate(rowData?.ngayCapNhat, true),
            },
          ]}
          data={listItems}
          options={tableOtion.options}
          localization={tableOtion.localization}
        />
      </DashboardCard>
      {open && (
        <DichVuDialog
          open={open}
          handleClose={handleClose}
          item={item}
          updateData={getAll}
          listNguoiDung={value}
        />
      )}
      {openDelete && (
        <ConfirmDialog open={openDelete} handleClose={handleClose} handleOke={handleOke} />
      )}
    </PageContainer>
  );
};

export default DichVu;
