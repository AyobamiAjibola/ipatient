'use client';

import Footer from "@/app/components/Footer";
import Navbar from "../components/Navbar";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import capitalize from "capitalize";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import MModal from "../components/Modal";
import { useGetAwards } from "../admin/hooks/userHook/useUser";
import { HourglassEmpty } from "@mui/icons-material";
import { FramerMotion2, FramerMotion3 } from "../components/FramerMotion";

const awardCategories = [
    "Hospital",
    "Facility",
    "Health"
];

export default function Award() {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const theme = useTheme();
    const [value, setValue] = useState<string>('All');
    const [currYear, setCurrYear] = useState<string>('All');
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [selectedIndex2, setSelectedIndex2] = useState<number>(-1);
    const [currentPage, setCurrentPage] = useState(1);
    const [nominees, setNominees] = useState<string[]>([]);
    const [openModal, setModalOpen] = useState<boolean>(false);
    const [awards, setAwards] = useState<any[]>([]);
    const fetchAwardsMutation = useGetAwards();

    const handleFetchAwards = async () => {
        await fetchAwardsMutation.mutateAsync({}, {
          onSuccess: (response: any) => {
            setAwards(response.results)
          }
        })
    }
    
    const filteredData = awards.filter((item) => {
        if(value === 'All' && currYear === 'All') {
            return item;
        }
        return item.awardCategory.includes(value) || new Date(item.dateRecieved).getFullYear().toString().includes(currYear)
    });

    const itemsPerPage = filteredData.length === awards.length ? 10 : filteredData.length;

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
    const currentData = filteredData.slice(startIndex, endIndex);

    const startYear = 2022;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => startYear + index);

    const handlePageChange = (newPage: any) => {
        setCurrentPage(newPage);
    };

    const handleCloseModal = () => {
        setModalOpen(false)
        setNominees([])
    }

    useEffect(() => {
        handleFetchAwards();
    },[]);

    return (
        <>
            <Navbar/>
            <Box
                sx={{
                    width: '100%',
                    minHeight: '300px',
                    pt: 7
                }}
            >
                <img
                    src='award-hero.png'
                    alt="award hero image"
                    style={{
                        height: '100%',
                        width: '100%'
                    }}
                />
                <FramerMotion2
                    sx={{
                        position: 'absolute',
                        mt: isMobile ? '-5rem' : '-15rem',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        flexDirection: 'column',
                        width: '100%',
                        px: isMobile ? '20px' : '90px'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: isMobile ? '1.5rem' : '4rem',
                            fontWeight: theme.typography.h2.fontWeight,
                            color: 'white', mb: isMobile ? -2 : -3
                        }}
                    >
                        Patient.ng
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: isMobile ? '1.5rem' : '4rem',
                            fontWeight: theme.typography.h2.fontWeight,
                            color: 'white'
                        }}
                    >
                        Awards
                    </Typography>
                </FramerMotion2>
            </Box>
            <FramerMotion3
                sx={{
                    height: 'auto',
                    px: isMobile ? '20px' : '90px',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row', gap: 4,
                    mt: isMobile ? -10 : 6, mb: 6
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        backgroundColor: theme.palette.secondary.lightest,
                        border: `1px solid ${theme.palette.secondary.lighter}`,
                        p: 4, flexDirection: 'column',
                        width: isMobile ? '100%' : '30%',
                        borderRadius: theme.borderRadius.sm,
                        height: '300px',
                        minHeight: '300px'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: theme.typography.labelsm.fontSize,
                            fontWeight: theme.typography.labelsm.fontWeight
                        }}
                    >
                        YEAR
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2, mt: '2px',
                            mb: 4,
                            overflowX: 'scroll',
                            whiteSpace: 'nowrap',
                            '&::-webkit-scrollbar': {
                            display: 'none',
                            },
                            scrollbarWidth: 'none',
                            width: '100%'
                        }}
                    >
                        {
                            years.map((year, index) => (
                                <Typography key={index}
                                    onClick={() => {
                                        setCurrYear(year.toString())
                                        setSelectedIndex2(index)
                                    }}
                                    sx={{
                                        fontSize: theme.typography.labelsm.fontSize,
                                        color: selectedIndex2 === index ? theme.palette.primary.main : theme.palette.secondary.light,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            color: theme.palette.primary.main,
                                        }
                                    }}
                                >
                                    {year}
                                </Typography>
                            ))
                        }
                        <Typography
                            onClick={() => {
                                setCurrYear('All')
                                setSelectedIndex2(-1)
                            }}
                            sx={{
                                fontSize: theme.typography.labelsm.fontSize,
                                color: selectedIndex2 === -1 ? theme.palette.primary.main : theme.palette.secondary.light,
                                cursor: 'pointer',
                                '&:hover': {
                                    color: theme.palette.primary.main,
                                },
                                maxWidth: '50%'
                            }}
                        >
                            All
                        </Typography>
                    </Box>

                    <Typography
                        sx={{
                            fontSize: theme.typography.labelsm.fontSize,
                            fontWeight: theme.typography.labelsm.fontWeight
                        }}
                    >
                        CATEGORIES
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexDirection: 'column'
                        }}
                    >
                        <Typography
                            onClick={() => {
                                setValue('All')
                                setSelectedIndex(-1)
                            }}
                            sx={{
                                fontSize: theme.typography.labelsm.fontSize,
                                color: selectedIndex === -1 ? theme.palette.primary.main : theme.palette.secondary.light,
                                cursor: 'pointer',
                                '&:hover': {
                                    color: theme.palette.primary.main,
                                },
                                maxWidth: '50%'
                            }}
                        >
                            All
                        </Typography>
                        {
                            awardCategories.map((category, index) => (
                                <Typography key={index}
                                    onClick={() => {
                                        setValue(category)
                                        setSelectedIndex(index)
                                    }}
                                    sx={{
                                        fontSize: theme.typography.labelsm.fontSize,
                                        color: selectedIndex === index ? theme.palette.primary.main : theme.palette.secondary.light,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            color: theme.palette.primary.main,
                                        },
                                        maxWidth: '50%'
                                    }}
                                >
                                    {capitalize.words(category)}
                                </Typography>
                            ))
                        }
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: isMobile ? '100%' : '70%', gap: 4
                    }}
                >
                    {   currentData.length > 0
                            ?   (currentData.map((award: any, index) => (
                                    <Box key={award._id}
                                        sx={{
                                            display: 'flex',
                                            width: isMobile ? '100%' : '45%',
                                            minHeight: '200px',
                                            border: `1px solid ${theme.palette.secondary.lighter}`,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            borderRadius: theme.borderRadius.sm
                                        }}
                                    >
                                        <img
                                            src='/award-icon.png'
                                            alt='award logo'
                                            style={{
                                                height: '60%',
                                                width: '50%'
                                            }}
                                        />
                                        <Typography className="capitalize"
                                            sx={{
                                                fontSize: theme.typography.labelsm.fontSize,
                                                fontWeight: theme.typography.labelsm.fontWeight,
                                                color: theme.palette.primary.darker
                                            }}
                                        >
                                            {award.awardName}
                                        </Typography>
                                        <Typography variant="labelsm" className="capitalize">
                                            {award.recipient}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: theme.typography.labelxs.fontSize,
                                                color: theme.palette.secondary.light
                                            }}
                                        >
                                            {award.address}
                                        </Typography>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: '1px',
                                                backgroundColor: theme.palette.secondary.lighter,
                                                my: 2
                                            }}
                                        />
                                        <Typography onClick={() => {
                                            setModalOpen(true), 
                                            setNominees(award.nominees ? award.nominees : [])}}
                                            sx={{
                                                fontSize: theme.typography.labelxxs.fontSize,
                                                color: theme.palette.secondary.light,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    color: theme.palette.primary.main
                                                }
                                            }}
                                        >
                                        See Nominees
                                        </Typography>
                                    </Box>
                                ))
                            ) : (
                                <Box width={'100%'} justifyContent={'center'} alignItems={'center'} display={'flex'} flexDirection={'column'}>
                                    <HourglassEmpty sx={{fontSize: '2em', color: theme.palette.border.main}}/>
                                    <Typography variant='paragraphlg' color={theme.palette.border.main}>
                                        No Data
                                    </Typography>
                                </Box>
                            )
                    }
                </Box>
            </FramerMotion3>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 5
                }}
            >
                {filteredData.length !== 0 && (<Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />)}
            </Box>
            <MModal open={openModal} onClose={handleCloseModal} height='auto'>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        width: '300px',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    {
                        nominees.length ? (
                            <ol>
                                {nominees.map((nominee, index) => (
                                <li key={index}>
                                    <Typography variant="paragraphsm">
                                        {index + 1} {capitalize.words(nominee)}
                                    </Typography>
                                </li>
                                ))}
                            </ol>
                        ) : (
                            <Typography>
                                No nominees for this award
                            </Typography>
                        )
                    }
                    <Typography>

                    </Typography>
                </Box>
            </MModal>
            <Footer/>
        </>
    )
}
