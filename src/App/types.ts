export interface UserModel {
  id: string;
  photo: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

export const validateName = (name: string): string => {
  if (!name) {
    return 'user name is required';
  } else if (name.length < 6) {
    return 'user name too short';
  } else if (name.trim().split(' ').length < 2) {
    return 'please provide full name';
  } else {
    return '';
  }
};

export const validateEmail = (email: string): string => {
  if (!email) {
    return 'Email is required';
  } else if (email.length < 6) {
    return 'Email is too short';
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return 'Invalid email format';
  } else {
    return '';
  }
};

export const validatePhone = (phone: string): string => {
  if (!phone) {
    return 'Phone number is required';
  } else if (!/^\d{10}$/u.test(phone)) {
    return 'Invalid phone number format';
  } else {
    return '';
  }
};
