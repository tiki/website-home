variable "aws_iam_role_lambda_exec" { }

data "aws_iam_role" "lambda_exec" {
  name = var.aws_iam_role_lambda_exec
}

resource "aws_lambda_function" "example" {
  function_name = "ServerlessExample"

  s3_bucket = local.aws_s3_bucket_backend
  s3_key    = "example.zip"

  handler = "main.handler"
  runtime = "nodejs12.x"

  tags = {
    Environment = local.global_tag_environment
    Service     = local.global_tag_service
  }

  role = data.aws_iam_role.lambda_exec.arn
}
