import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  return <Navigate to={`/search?category=${categoryId || ''}`} replace />;
};
