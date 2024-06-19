import { useMutation, useQueryClient } from 'react-query';
import { types } from '../../../../../types/models';
import { useBlogApi } from './useBlogApi';

export const useCreateBlogCategory = () => {
    const api = useBlogApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.createBlogCategory(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['create_blog_cat'] });
      },
      onError: (error: Error) => {
        console.error('Error creating user:', error);
      },
    });
};

export const useDeleteBlogCategory = () => {
    const api = useBlogApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.deleteBlogCategory(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['delete-blog-cat'] });
      },
      onError: (error: Error) => {
        console.error('Error creating user:', error);
      },
    });
};

export const useGetBlogCategories = () => {
    const api = useBlogApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: () => {
        return api.getBlogCategories();
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get-blog-cat'] });
      },
      onError: (error: Error) => {
        console.error('Error creating user:', error);
      },
    });
};

export const useCreateBlog = () => {
    const api = useBlogApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.createBlog(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['create_blog'] });
      },
      onError: (error: Error) => {
        console.error('Error creating user:', error);
      },
    });
};

export const useUpdateBlog = () => {
    const api = useBlogApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.updateBlog(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['update_blog'] });
      },
      onError: (error: Error) => {
        console.error('Error creating user:', error);
      },
    });
};

export const useLikeBlog = () => {
    const api = useBlogApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.likeBlog(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['like_blog'] });
      },
      onError: (error: Error) => {
        console.error('Error creating user:', error);
      },
    });
};

export const useCommentOnBlog = () => {
    const api = useBlogApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.commentOnBlog(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['comment_on_blog'] });
      },
      onError: (error: Error) => {
        console.error('Error creating user:', error);
      },
    });
};

export const useDeleteBlog = () => {
    const api = useBlogApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.deleteBlog(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['delete_blog'] });
      },
      onError: (error: Error) => {
        console.error('Error creating user:', error);
      },
    });
};

export const useGetBlogs = () => {
    const api = useBlogApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: () => {
        return api.getBlogs();
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get_blogs'] });
      },
      onError: (error: Error) => {
        console.error('Error creating user:', error);
      },
    });
};

export const useGetUserBlogs = () => {
    const api = useBlogApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: () => {
        return api.getUsersBlogs();
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get_users_blogs'] });
      },
      onError: (error: Error) => {
        console.error('Error creating user:', error);
      },
    });
};

export const useGetBlogsWithCategory = () => {
    const api = useBlogApi();
    const queryClient = useQueryClient();
  
    return useMutation<
      types.ApiResponseSuccess<any>,
      Error,
      any
    >({
      mutationFn: (requestParameters: any) => {
        return api.getBlogsWithCategory(requestParameters);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['delete_blog'] });
      },
      onError: (error: Error) => {
        console.error('Error creating user:', error);
      },
    });
};

export const useGetSingleBlog = () => {
  const api = useBlogApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.getSingleBlog(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['delete_blog'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useChangeToDraft = () => {
  const api = useBlogApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.changeBlogToDraft(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['draft_blog'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useChangeToPublish = () => {
  const api = useBlogApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.changeBlogToPublish(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['publish_blog'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

export const useChangeToArchive = () => {
  const api = useBlogApi();
  const queryClient = useQueryClient();

  return useMutation<
    types.ApiResponseSuccess<any>,
    Error,
    any
  >({
    mutationFn: (requestParameters: any) => {
      return api.changeBlogToArchive(requestParameters);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['archive_blog'] });
    },
    onError: (error: Error) => {
      console.error('Error creating user:', error);
    },
  });
};

