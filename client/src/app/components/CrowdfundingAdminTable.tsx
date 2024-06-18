'use client';

import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { characterBreaker, formAmount } from '@/lib/helper';
import { useAtom } from 'jotai';
import { useAdminUser, useCrowdStatus } from '@/lib/atoms';
import moment from 'moment';

const CrowdfundingAdminTable: React.FC = ({data}: any) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [_, setIsAdmin] = useAtom(useAdminUser);
  const [__, setCrowdStatus] = useAtom(useCrowdStatus);

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Title',
      key: 'title',
      render: (_, record) => {
        return (
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant='labelsm' className='capitalize'>
              {isMobile ? characterBreaker(record.title, 10) : characterBreaker(record.title, 20)}...
            </Typography>
            <Typography variant='paragraphxxs' color={theme.palette.secondary.light}>
              {moment(record.createdAt).format('MM/DD/YYYY(hh:mm A)')}
            </Typography>
          </Box>
      )},
    },
    {
      title: 'Created by',
      key: 'createdBy',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' color={theme.palette.secondary.light} className='capitalize'>
            {`${record.user.firstName} ${record.user.lastName}`}
          </Typography>
      )},
    },
    {
      title: 'Fundraising for',
      dataIndex: 'fundraiserFor',
      key: 'fundraiserFor',
      render: (_, record) => {
        return (
          <Tag className='capitalize'>
            {record.fundraisingFor}
          </Tag>
      )},
    },
    {
      title: 'Amount',
      dataIndex: 'amountNeeded',
      key: 'amountNeeded',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' color={theme.palette.secondary.light}>
            {formAmount(record.amountNeeded)}
          </Typography>
      )},
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        return (
          <Tag className='capitalize'
            style={{
              color: record.status === "pending"
                      ? theme.palette.state.warning
                      : record.status === "done"
                        ? theme.palette.primary.main
                        : record.status === "active" ? theme.palette.primary.darker : theme.palette.state.error
            }}  
          >
            {record.status}
          </Tag>
      )},
    },
    {
      title: 'Location',
      key: 'location',
      render: (_, record) => {
        return (
          <Typography variant='labelxs' color={theme.palette.secondary.light}>
            {record.address}
          </Typography>
      )},
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const handleUser = () => {
          setCrowdStatus(record.status)
          setIsAdmin(true)
          router.push(`/crowdfunding/${record._id}`)
        }
        return (
          <Typography variant='labelxs'
            onClick={handleUser}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: theme.palette.primary.main
              }
            }}
          >
            Open
          </Typography>
      )},
    },
  ];

  const dataWithKeys = data.map((item: any) => ({ ...item, key: item._id }));

  return (
    <Table 
      columns={columns} 
      dataSource={dataWithKeys}
      style={{
        overflowY: 'scroll'
      }}
    />
  )};

export default CrowdfundingAdminTable;