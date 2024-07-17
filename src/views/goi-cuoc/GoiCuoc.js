import React, { useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import MaterialTable from 'material-table';
import { tableOtion } from '../utilities/TableOption';
import { Box, Button } from '@mui/material';
import { BorderColorSharp, Delete, LibraryAddCheck } from '@mui/icons-material';
import GoiCuocDialog from './GoiCuocDialog';
import { deleteGoiCuoc, getAllGoiCuoc } from './GoiCuocServices';
import { code, convertDate, role } from 'src/const';
import ConfirmDialog from 'src/components/dialog/ConfirmDialog';
import { toast } from 'react-toastify';

const GoiCuoc = () => {
  let isRoleNguoiDung = JSON.parse(sessionStorage.getItem('user'))?.vaiTro === role[0];
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [item, setItem] = React.useState(null);
  const [listItems, setlistItems] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setOpenConfirm(false);
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

  const handleConfirmDialog = (rowData = {}) => {
    setItem(rowData);
    setOpenConfirm(true);
  };

  const handleOke = async () => {
    try {
      await deleteGoiCuoc(item?.maGoiCuoc);
      toast.success('Xóa thành công.');
    } catch (error) {
      toast.error('Có lỗi xảy ra.');
    } finally {
      handleClose();
      getAll();
    }
  };

  const handleConfirm = async () => {
    // try {
    //   await deleteGoiCuoc(item?.maGoiCuoc);
    //   toast.success('Xóa thành công.');
    // } catch (error) {
    //   toast.error('Có lỗi xảy ra.');
    // } finally {
    //   handleClose();
    //   getAll();
    // }
  };
  const getAll = async () => {
    try {
      const data = await getAllGoiCuoc();
      if (data?.status === code.success) {
        setlistItems(data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <PageContainer title="Gói cước" description="">
      <DashboardCard title="Danh sách gói cước">
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
              render: (rowData) => {
                return (
                  <Box sx={{ display: 'flex', gap: 1, cursor: 'pointer' }}>
                    {isRoleNguoiDung ? (
                      <div onClick={() => handleConfirmDialog(rowData)}>
                        <LibraryAddCheck fontSize="small" sx={{ color: 'primary.main' }} />
                      </div>
                    ) : (
                      <>
                        <div onClick={() => handleEdit(rowData)}>
                          <BorderColorSharp fontSize="small" sx={{ color: 'primary.main' }} />
                        </div>
                        <div onClick={() => handleDelete(rowData)}>
                          <Delete fontSize="small" sx={{ color: 'error.main' }} />
                        </div>
                      </>
                    )}
                  </Box>
                );
              },
            },
            { title: 'Tên gói cước', field: 'tenGoiCuoc' },
            { title: 'Giá', field: 'gia' },
            {
              title: 'Ngày tạo',
              field: 'ngayTao',
              render: (rowData) => convertDate(rowData?.ngayTao, true),
            },
            {
              title: 'Thời hạn sử dụng',
              field: 'thoiHanSuDung',
            },
          ]}
          data={listItems}
          options={tableOtion.options}
          localization={tableOtion.localization}
        />
      </DashboardCard>
      {open && (
        <GoiCuocDialog open={open} handleClose={handleClose} item={item} updateData={getAll} />
      )}
      {openDelete && (
        <ConfirmDialog open={openDelete} handleClose={handleClose} handleOke={handleOke} />
      )}
      {openConfirm && (
        <ConfirmDialog
          open={openConfirm}
          handleClose={handleClose}
          handleOke={handleConfirm}
          subTitle={'Bạn có muốn đăng ký gói cước này?'}
        />
      )}
    </PageContainer>
  );
};

export default GoiCuoc;
