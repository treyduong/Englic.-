'use client';

import React from 'react';
import { SignIn, SignUp } from '@clerk/nextjs';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  setMode: (mode: 'login' | 'register') => void;
}

export default function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Đóng cửa sổ đăng nhập"
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-3xl bg-white p-4 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          aria-label="Đóng"
        >
          ✕
        </button>
        {mode === 'login' ? (
          <SignIn routing="hash" signUpUrl="/sign-up" fallbackRedirectUrl="/dashboard" />
        ) : (
          <SignUp routing="hash" signInUrl="/sign-in" fallbackRedirectUrl="/dashboard" />
        )}
      </div>
    </div>
  );
}
