output "cloudfront_url" {
  description = "Public URL of the Angular frontend"
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "alb_dns" {
  description = "ALB DNS — used only for health checking; public traffic goes through CloudFront"
  value       = aws_lb.backend.dns_name
}

output "ecr_repository_url" {
  description = "ECR repository URL for backend image pushes"
  value       = aws_ecr_repository.backend.repository_url
}

output "ecs_cluster_name" {
  description = "ECS cluster name for pipeline deploy commands"
  value       = aws_ecs_cluster.main.name
}

output "ecs_service_name" {
  description = "ECS service name for pipeline deploy commands"
  value       = aws_ecs_service.backend.name
}

output "frontend_bucket" {
  description = "S3 bucket name for Angular asset uploads"
  value       = aws_s3_bucket.frontend.bucket
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID for cache invalidations"
  value       = aws_cloudfront_distribution.frontend.id
}

output "github_actions_role_arn" {
  description = "ARN of the IAM role GitHub Actions will assume via OIDC"
  value       = aws_iam_role.github_actions.arn
}
