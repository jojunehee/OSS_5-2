import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ParcelTable, EditModal, AddModal, Header } from './components';

function App() {
  // 필요한 상태 변수, 함수 선언부 ------------------------------------------------------------
  const [parcels, setParcels] = useState([]); // 택배 정보를 저장하는 상태 변수
  const [currentParcel, setCurrentParcel] = useState(null); // 현재 수정 중인 택배 정보를 저장하는 상태 변수
  const [showModal, setShowModal] = useState(false); // 수정 모달 창의 표시 여부를 관리하는 상태 변수
  const [showAddModal, setShowAddModal] = useState(false); // 추가 모달 창의 표시 여부를 관리하는 상태 변수
  const [newParcel, setNewParcel] = useState({
    tracking_number: '',
    sender_name: '',
    recipient_name: '',
    recipient_address: '',
    status: '',
    cost: ''
  }); // 새로운 택배 정보를 저장하는 상태 변수

  // 데이터 가져오기
  const fetchParcels = async () => {
    const response = await axios.get('https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels');
    setParcels(response.data);
  };

  // 맨 처음에 데이터 가져오기
  useEffect(() => {
    fetchParcels();
  }, []);

  // 모달 열기/닫기
  const handleShowModal = (parcel) => {
    setCurrentParcel({ ...parcel });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  // 입력 값 업데이트
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentParcel({ ...currentParcel, [name]: value });
  };

  // 수정 서버에 저장
  const saveChanges = async () => {
    await axios.put(`https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels/${currentParcel.id}`, currentParcel);
    fetchParcels();
    setShowModal(false);
  };

  // 새 데이터 추가 입력 값 관리
  const handleNewParcelChange = (e) => {
    const { name, value } = e.target;
    setNewParcel({ ...newParcel, [name]: value });
  };

  // 새 데이터 추가
  const addParcel = async () => {
    await axios.post('https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels', newParcel);
    fetchParcels();
    setNewParcel({
      tracking_number: '',
      sender_name: '',
      recipient_name: '',
      recipient_address: '',
      status: '',
      cost: ''
    });
    setShowAddModal(false);
  };

  // 데이터 삭제
  const deleteParcel = async (id) => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      await axios.delete(`https://67296bac6d5fa4901b6d14a6.mockapi.io/oss4-2/parcels/${id}`);
      fetchParcels();
    }
  };

  //------------------------------------------------------------ 필요한 상태 변수, 함수 선언부 끝
  return (
    <div className="container">
      <Header handleShowAddModal={handleShowAddModal} />
      <ParcelTable parcels={parcels} handleShowModal={handleShowModal} deleteParcel={deleteParcel} />

      {currentParcel && (
        <EditModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          currentParcel={currentParcel}
          handleInputChange={handleInputChange}
          saveChanges={saveChanges}
        />
      )}

      <AddModal
        showAddModal={showAddModal}
        handleCloseAddModal={handleCloseAddModal}
        newParcel={newParcel}
        handleNewParcelChange={handleNewParcelChange}
        addParcel={addParcel}
      />
    </div>
  );
}

export default App;