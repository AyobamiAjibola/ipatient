import { 
    ChatOutlined,
    DesktopWindowsOutlined, 
    DynamicFeedOutlined, 
    EmojiEventsOutlined, 
    EventNoteOutlined, 
    FavoriteBorderOutlined, 
    FlagOutlined, 
    KeyboardVoiceOutlined, 
    MedicationOutlined, 
    PersonOutlineOutlined,
    LocalHospitalOutlined,
    HandshakeOutlined,
    FindInPageOutlined
} from "@mui/icons-material"

const items = {
    '': [
        {
            title: 'Dashboard',
            link: '/admin/dashboard',
            iconName: DesktopWindowsOutlined
        },
        {
            title: 'Users',
            link: '/admin/users',
            iconName: PersonOutlineOutlined
        },
        {
            title: 'Crowdfunding',
            link: '/admin/crowdfunding',
            iconName: FavoriteBorderOutlined
        },
        {
            title: 'Insight',
            link: '/admin/insight',
            iconName: MedicationOutlined
        },
        {
            title: 'Advocacy',
            link: '/admin/advocacy',
            iconName: FlagOutlined
        }
    ],
    RESOURCES: [
        {
            title: 'Blog',
            link: '/admin/blog',
            iconName: EventNoteOutlined
        },
        {
            title: 'Patient Stories Mgt',
            link: '/admin/patientstories',
            iconName: ChatOutlined
        },
        {
            title: 'Webinar',
            link: '/admin/webinar',
            iconName: DynamicFeedOutlined
        },
        {
            title: 'Podcast',
            link: '/admin/podcast',
            iconName: KeyboardVoiceOutlined
        },
        {
            title: 'Award Mgt',
            link: '/admin/award',
            iconName: EmojiEventsOutlined
        }
    ],
    OTHERS: [
        {
            title: 'Hospitals',
            link: '/admin/hospitals',
            iconName: LocalHospitalOutlined
        },
        {
            title: 'T&C',
            link: '/admin/terms-and-condition',
            iconName: HandshakeOutlined
        },
        {
            title: 'Contact/About Us',
            link: '/admin/contact-and-about-us',
            iconName: FindInPageOutlined
        }
    ]
}

export const items2 = {
    '': [
        {
            title: 'Dashboard',
            link: '/admin/dashboard',
            iconName: DesktopWindowsOutlined
        },
    ],
    RESOURCES: [
        {
            title: 'Blog',
            link: '/admin/blog',
            iconName: EventNoteOutlined
        },
        {
            title: 'Webinar',
            link: '/admin/webinar',
            iconName: DynamicFeedOutlined
        },
        {
            title: 'Podcast',
            link: '/admin/podcast',
            iconName: KeyboardVoiceOutlined
        }
    ]
}

export default items