import React, { useState } from 'react';
import { Layout, Menu, Input, Button, List, Avatar, Modal, Form, Tabs, Select, message } from 'antd';
import { UserAddOutlined, SearchOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

interface Friend {
    id: number;
    name: string;
    avatar: string;
    group: string;
    organization?: string;
}

const mockUserDatabase: Friend[] = [
    { id: 1, name: 'John Doe', avatar: 'https://via.placeholder.com/40', group: '', organization: 'Company A' },
    { id: 2, name: 'Jane Smith', avatar: 'https://via.placeholder.com/40', group: '', organization: 'Company B' },
    { id: 3, name: 'Alice Johnson', avatar: 'https://via.placeholder.com/40', group: '', organization: 'Company A' },
    // Add more mock users as needed
];

const AllFriends: React.FC = () => {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [groups, setGroups] = useState<string[]>(['Default']);
    const [selectedGroup, setSelectedGroup] = useState<string>('Default');
    const [newFriendName, setNewFriendName] = useState<string>('');
    const [newGroupName, setNewGroupName] = useState<string>('');
    const [isAddFriendModalVisible, setIsAddFriendModalVisible] = useState<boolean>(false);
    const [isAddGroupModalVisible, setIsAddGroupModalVisible] = useState<boolean>(false);
    const [isViewProfileModalVisible, setIsViewProfileModalVisible] = useState<boolean>(false);
    const [currentFriend, setCurrentFriend] = useState<Friend | null>(null);
    const [searchResults, setSearchResults] = useState<Friend[]>([]);
    const [searchCriteria, setSearchCriteria] = useState<{ id?: number; name?: string; organization?: string }>({});
    const [friendSearchName, setFriendSearchName] = useState<string>('');
    const [searchedFriends, setSearchedFriends] = useState<Friend[]>([]);

    const handleAddFriend = (friend: Friend) => {
        if (friends.some(f => f.id === friend.id)) {
            message.warning('This friend is already added.');
            return;
        }
        if (friend) {
            const newFriend = { ...friend, group: selectedGroup };
            setFriends([...friends, newFriend]);
            setSearchResults([]);
            setSearchCriteria({});
            setIsAddFriendModalVisible(false);
        }
    };

    const handleDeleteFriend = (id: number) => {
        setFriends(friends.filter(friend => friend.id !== id));
        message.success('Friend deleted successfully.');
    };

    const handleAddGroup = () => {
        if (newGroupName) {
            setGroups([...groups, newGroupName]);
            setNewGroupName('');
            setIsAddGroupModalVisible(false);
        }
    };

    const handleViewProfile = (friend: Friend) => {
        setCurrentFriend(friend);
        setIsViewProfileModalVisible(true);
    };

    const handleSearch = () => {
        const results = mockUserDatabase.filter(user => {
            return (
                (searchCriteria.id === undefined || user.id === searchCriteria.id) &&
                (searchCriteria.name === undefined || user.name.toLowerCase().includes(searchCriteria.name.toLowerCase())) &&
                (searchCriteria.organization === undefined || user.organization?.toLowerCase().includes(searchCriteria.organization.toLowerCase()))
            );
        });
        setSearchResults(results);
    };

    const handleFriendSearch = () => {
        const results = friends.filter(friend =>
            friend.name.toLowerCase().includes(friendSearchName.toLowerCase())
        );
        setSearchedFriends(results);
    };

    return (
        <Layout className="layout">
            <Header>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1">All Friends</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <h2>Friend List</h2>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddGroupModalVisible(true)}>
                        Add Group
                    </Button>
                    <Input.Search
                        placeholder="Search friends by name"
                        enterButton={<SearchOutlined />}
                        style={{ margin: '10px 0' }}
                        value={friendSearchName}
                        onChange={(e) => setFriendSearchName(e.target.value)}
                        onSearch={handleFriendSearch}
                    />
                    <Tabs activeKey={selectedGroup} onChange={setSelectedGroup}>
                        {groups.map((group) => (
                            <TabPane tab={group} key={group}>
                                <Button type="dashed" icon={<UserAddOutlined />} onClick={() => setIsAddFriendModalVisible(true)}>
                                    Add Friend
                                </Button>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={friendSearchName ? searchedFriends : friends.filter((friend) => friend.group === group)}
                                    renderItem={(friend) => (
                                        <List.Item
                                            actions={[
                                                <Button onClick={() => handleViewProfile(friend)}>View Profile</Button>,
                                                <Button onClick={() => handleDeleteFriend(friend.id)} icon={<DeleteOutlined />}>Delete</Button>
                                            ]}
                                        >
                                            <List.Item.Meta
                                                avatar={<Avatar src={friend.avatar} />}
                                                title={<a href="#">{friend.name}</a>}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </TabPane>
                        ))}
                    </Tabs>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>All Friends ©2024 Created by Your Name</Footer>

            <Modal
                title="Add Friend"
                visible={isAddFriendModalVisible}
                onCancel={() => setIsAddFriendModalVisible(false)}
                footer={null}
            >
                <Form layout="vertical">
                    <Form.Item label="ID">
                        <Input
                            type="number"
                            onChange={(e) => setSearchCriteria({ ...searchCriteria, id: parseInt(e.target.value) })}
                        />
                    </Form.Item>
                    <Form.Item label="Name">
                        <Input onChange={(e) => setSearchCriteria({ ...searchCriteria, name: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Organization">
                        <Input onChange={(e) => setSearchCriteria({ ...searchCriteria, organization: e.target.value })} />
                    </Form.Item>
                    <Button type="primary" onClick={handleSearch}>
                        Search
                    </Button>
                </Form>
                <List
                    itemLayout="horizontal"
                    dataSource={searchResults}
                    renderItem={(friend) => (
                        <List.Item actions={[<Button onClick={() => handleAddFriend(friend)}>Add</Button>]}>
                            <List.Item.Meta
                                avatar={<Avatar src={friend.avatar} />}
                                title={friend.name}
                                description={friend.organization}
                            />
                        </List.Item>
                    )}
                />
            </Modal>

            <Modal
                title="Add Group"
                visible={isAddGroupModalVisible}
                onOk={handleAddGroup}
                onCancel={() => setIsAddGroupModalVisible(false)}
            >
                <Form layout="vertical">
                    <Form.Item label="Group Name">
                        <Input value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Friend Profile"
                visible={isViewProfileModalVisible}
                onOk={() => setIsViewProfileModalVisible(false)}
                onCancel={() => setIsViewProfileModalVisible(false)}
            >
                {currentFriend && (
                    <div>
                        <Avatar size={64} src={currentFriend.avatar} />
                        <h2>{currentFriend.name}</h2>
                        <p>Organization: {currentFriend.organization}</p>
                        <Button type="primary" onClick={() => alert('Go to personal space')}>
                            Go to Personal Space
                        </Button>
                    </div>
                )}
            </Modal>
        </Layout>
    );
};

export default AllFriends;
