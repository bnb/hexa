workspace(
    name = "{{functionAppName}}",
    managed_directories = {"@npm": ["node_modules"]},
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "1447312c8570e8916da0f5f415186e7098cdd4ce48e04b8e864f793c766959c3",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/0.38.2/rules_nodejs-0.38.2.tar.gz"],
)

load("@build_bazel_rules_nodejs//:index.bzl", "npm_install")
npm_install(
    name = "npm",
    package_json = "//:package.json",
    package_lock_json = "//:package-lock.json",
)

load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")
install_bazel_dependencies()

load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")
ts_setup_workspace()
