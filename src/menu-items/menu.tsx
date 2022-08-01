// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconMessage, IconPercentage, IconUser, IconUsers } from '@tabler/icons';
import { GroupMenuItems } from 'types';

const menu: GroupMenuItems = {
    id: 'sample-docs-roadmap-menu',
    type: 'group',
    title: 'Menu',
    children: [
        {
            id: 'offers',
            title: <FormattedMessage id="menu_offers" />,
            type: 'item',
            url: '/offers',
            icon: IconPercentage,
            breadcrumbs: false
        },
        {
            id: 'clients',
            title: <FormattedMessage id="clients" />,
            type: 'item',
            url: '/clients',
            icon: IconUser,
            breadcrumbs: false
        },
        {
            id: 'team',
            title: <FormattedMessage id="menu_team" />,
            type: 'item',
            url: '/team',
            icon: IconUsers,
            breadcrumbs: false
        },
        {
            id: 'messages',
            title: <FormattedMessage id="menu_messages" />,
            type: 'item',
            url: '/messages',
            icon: IconMessage,
            breadcrumbs: false
        }
    ]
};

export default menu;
