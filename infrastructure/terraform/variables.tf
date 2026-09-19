variable "aws_region" {
  description = "AWS region to deploy all resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name used in resource naming and tags"
  type        = string
  default     = "dev"
}

variable "project" {
  description = "Project identifier used in resource naming"
  type        = string
  default     = "aquaflux"
}

variable "backend_image" {
  description = "Full ECR image URI including tag, e.g. 123456789.dkr.ecr.us-east-1.amazonaws.com/aquaflux-backend:latest"
  type        = string
  default     = "placeholder"
}

variable "backend_cpu" {
  description = "Fargate task CPU units (256 = 0.25 vCPU)"
  type        = number
  default     = 256
}

variable "backend_memory" {
  description = "Fargate task memory in MiB"
  type        = number
  default     = 512
}

variable "github_org" {
  description = "GitHub organisation or user for OIDC trust"
  type        = string
  default     = "sakethoney"
}

variable "github_repo" {
  description = "GitHub repository name for OIDC trust"
  type        = string
  default     = "aquaflux-capability"
}
