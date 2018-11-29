angular.module('empatica').config(function ($translateProvider) {

    $translateProvider.translations('en', {
        'CLOSE': 'Close',

        'APP_HOME': 'Home',
        'APP_LOGIN': 'Login',
        'APP_LOGOUT': 'Logout',
        'APP_PROFILE': 'Your profile',
        'APP_COMPANY': 'Company',
        'APP_CAREERS': 'Careers',
        'APP_COPYRIGHT': '© 2017 Empatica Inc. - ISO 13485 Cert. No. 9124.EPTC - All right reserved',

        'HOME_TITLE': 'Smart technology for people<br>living with epilepsy',
        'HOME_SUBTITLE': 'Comes with a 30-days Free Trial Subscription',
        'HOME_BUY_NOW': 'Buy Now',
        'HOME_DISCOVER': 'Discover Embrace Features',
        'HOME_CONTENT_TITLE': 'Your companion for epilepsy management',
        'HOME_CONTENT_SUBTITLE': 'The Embrace watch uses advanced learning algorithms to identify tonic-clonic seizures and send alerts to caregivers. It also provides sleep, rest, and physical activity analysis.',

        'PROFILE_EMAIL': 'Email',
        'PROFILE_NAME': 'Name',
        'PROFILE_ORDERS': 'Orders',
        'PROFILE_PERSONAL_PROFILE': 'Personal profile',
        'PROFILE_STATUS': 'Status',
        'PROFILE_NO_ORDERS': 'Looks like you don\'t have any order yet.<br>Check out our marketplace and discover our full offer of life-saving products.',

        'ORDER_STATUS_PAID': 'Paid',
        'ORDER_STATUS_IN_TRANSIT': 'In transit',
        'ORDER_ORDERED_ITEMS': 'Ordered items',
        'ORDER_DISCOUNTS': 'Discounts',
        'ORDER_TOTAL': 'Total',
        'ORDER_TRACKING': 'Tracking',
        'ORDER_CANCEL_ORDER': 'Cancel order',
        'ORDER_STATUS': 'Status',
        'ORDER_TRACKING_CODE': 'Tracking code',
        'ORDER_CARRIER': 'Carrier',
        'ORDER_CANCEL': 'Cancel order',
        'ORDER_ORDER': 'Order',
        'ORDER_CANCEL_CONFIRMATION': 'Are you sure you want to delete your order?'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
});
