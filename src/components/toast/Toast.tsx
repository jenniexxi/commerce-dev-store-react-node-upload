import React, { useCallback, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import { T } from '@commons';

import { colors } from '@styles/theme';

import * as S from './Toast.style';

type ToastProps = {
  id: string;
  message: string;
  duration: number;
  onClose: (id: string) => void;
  bottom: number;
};

const Toast: React.FC<ToastProps> = ({ message, duration, onClose, id, bottom }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => onClose(id), 300); // Wait for fade out animation
    }, duration - 300);

    return () => clearTimeout(timer);
  }, [duration, onClose, id]);

  return (
    <S.ToastWrapper
      $isClosing={isClosing}
      $bottom={bottom}
    >
      <T.Body2_Normal $color={colors.text1}>{message}</T.Body2_Normal>
    </S.ToastWrapper>
  );
};

type ToastData = {
  id: string;
  message: string;
  duration: number;
  bottom?: number;
};

let toasts: ToastData[] = [];
let setToasts: React.Dispatch<React.SetStateAction<ToastData[]>> | null = null;

export const addToast = (message: string, duration: number = 3000, bottom: number = 10) => {
  const id = Math.random().toString(36).substr(2, 9);
  const newToast = { id, message, duration, bottom };
  toasts = [...toasts, newToast];
  setToasts?.(toasts);
};

export const ToastContainer: React.FC = () => {
  const [localToasts, setLocalToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    setToasts = setLocalToasts;
    return () => {
      setToasts = null;
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    toasts = toasts.filter((toast) => toast.id !== id);
    setLocalToasts(toasts);
  }, []);

  return createPortal(
    <S.ToastContainerWrapper>
      {localToasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          duration={toast.duration}
          bottom={toast.bottom || 10}
          onClose={removeToast}
        />
      ))}
    </S.ToastContainerWrapper>,
    document.body,
  );
};
