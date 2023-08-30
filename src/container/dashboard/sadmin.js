// --Lokesh Changes
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import DataTables from '../superadmin/AdminListTable/DataTable'
import CustomModal from '../superadmin/CreateEditAdminModal/index'
import {createNewAdmin, getAllAdmins} from '../../redux/sadmin/actionCreator'
const Dashboard = () => {
	const [state, setState] = useState({
    flag: 'english',
	username:localStorage.getItem('username'),
  });
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showDeleteConf, setShowDeleteConf] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState('')
  const [modalType, setModalType] = useState('')
  const [admins, setadmins] = useState([])
  const [selectedUserFirstname, setselectedUserFirstname] = useState('')
  const [selectedUserLastname, setselectedUserLastname] = useState('')
  const [selectedUserPhonenumber, setselectedUserPhonenumber] = useState('')
  const { flag, username } = state;

  useEffect(() => {
      dispatch(getAllAdmins())
  }, [])  
  const Admins = useSelector(state => { return state.sadmin?.admins?.data })
  const isLoading = useSelector(state =>state.sadmin.loading)
  useEffect(() => {
  setadmins(Admins)
},[])
    const addAdmin = () => {
      setIsModalVisible(true);
      setModalType('create');
    };
  const cancelDelete = () => {
setShowDeleteConf(false)
  }
const deleteUser = () => {
  alert(selectedUserId)
setShowDeleteConf(false)
  
}
  const resetValues = () => {
    setSelectedUserId('')
    setFirstname('')
    setLastname('')
    setPhone('')
    setEmail('')
    setModalType('');
  }
  const handleEditClick = (admin) => {
    console.log('asasdas',admin)
    setSelectedUserId(admin.id)
    setFirstname(admin.first_name)
    setLastname(admin.last_name)
    setPhone(admin.mobile)
    setEmail(admin.email)
    setIsModalVisible(true)
    setModalType('edit');
  }
  const handleDeleteClick = (key) => {
    setSelectedUserId(key)
    setShowDeleteConf(true)

  }
  const handleOk = (e) => {
    e.preventDefault();
    if (Firstname && Lastname && phone  && email) {
      let data = {
          "first_name": Firstname,
          "last_name": Lastname,
          "mobile": phone,
          "email": email
      }
      if (modalType === 'edit') {
          console.log('edit type it is')
      }
      else {
        dispatch(createNewAdmin(data))
      }
      setIsModalVisible(false);
    }
  };
  const handleCancel = () => {
    console.log('cancel')
    if (Firstname && Lastname && phone && email) {
      setFirstname('')
      setLastname('')
      setPhone('')
      setEmail('')
      setPassword('')
    }
    setIsModalVisible(false);
  };
  return (
    <>
      <PageHeader
        ghost
        title="Super Admin Dashboard"
        buttons={[
          <div key="6" className="page-header-actions">
            <CalendarButtonPageHeader key="1" />
            <ExportButtonPageHeader key="2" />
            <ShareButtonPageHeader key="3" />
            <Button size="small" key="4" type="primary" onClick={addAdmin}>
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards headless>
              <div style={{ minHeight: 'calc(100vh - 320px)' }}>
                <h2>Welcome, {username}</h2>
                <CustomModal
                  selectedUserFirstname={selectedUserFirstname}
                  selectedUserLastname={selectedUserLastname}
                  selectedUserPhonenumber={selectedUserPhonenumber}
                  modalType={modalType}
                  setFirstname={setFirstname}
                  setLastname={setLastname}
                  setPhone={setPhone}
                  setPassword={setPassword}
                  setEmail={setEmail}
                  Firstname={Firstname}
                  Lastname={Lastname}
                  phone={phone}
                  email={email}
                  password={password}
                  title={modalType === "create" ? "Create a new Admin" : "Edit Admin Information"}
                  isModalVisible={isModalVisible}
                  handleCancel={handleCancel}
                  handleOk={handleOk}
                  resetValues={resetValues}
                />
                <DataTables admins={admins} isLoading={isLoading} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} showConfirmation={showDeleteConf} cancelDelete={cancelDelete} deleteUser={deleteUser}
                  />

              </div>
            </Cards>
          </Col>
        </Row>
        <Row gutter={25}>
        </Row>
      </Main>
    </>
  );
};

export default Dashboard;
