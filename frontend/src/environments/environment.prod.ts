// Empty backendUrl — requests go to CloudFront /api/* which routes to ALB
export const environment = {
  production: true,
  backendUrl: '',
};
