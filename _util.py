from contextlib import contextmanager
from functools import wraps
from subprocess import PIPE, run


class Dfx:
    @classmethod
    def start(cls):
        cls._run("start", "--background", allow_failure=True, pipe=False)

    @classmethod
    def stop(cls):
        cls._run("stop", allow_failure=True, pipe=False)

    @classmethod
    def get_canister_id(cls, name: str) -> str:
        return cls._run("canister", "id", name)

    @classmethod
    def create_canisters(cls, name: str | None = None, all: bool = False):
        cmd = ["canister", "create"]
        if name:
            cmd.append(name)
        if all:
            cmd.append("--all")

        cls._run(*cmd)

    @classmethod
    def build(cls):
        process = cls._run("build")

    @classmethod
    def get_identities(cls) -> list[str]:
        output = cls._run("identity", "list")
        return output.splitlines()

    @classmethod
    def get_principal(cls, identity: str | None) -> str:
        cmd = ["identity", "get-principal"]
        if identity:
            cmd.extend(("--identity", identity))

        return cls._run(*cmd)

    @classmethod
    def create_identity(cls, name: str):
        cls._run("identity", "new", "--disable-encryption", name)

    @classmethod
    def deploy(cls, name: str, argument: str | None = None):
        cmd = ["deploy", name]
        if argument:
            cmd.extend(("--argument", argument))

        cls._run(*cmd)

    @classmethod
    def call(
        cls, canister_name: str, method_name: str, arguments: str | None = None
    ) -> str:
        return cls._run(
            "canister", "call", canister_name, method_name, arguments or "()"
        )

    @staticmethod
    def _run(*cmd, allow_failure: bool = False, pipe: bool = True) -> str:
        cmd = ["dfx", *cmd]
        print_input(" ".join(cmd))

        if pipe:
            stdout = PIPE
            stderr = PIPE
        else:
            stdout = None
            stderr = None

        process = run(cmd, stdout=stdout, stderr=stderr)
        if not allow_failure and process.returncode != 0:
            raise ValueError(process.stderr.decode("utf8"))

        if pipe:
            result = process.stdout.decode("utf8")
            return result.strip()

        return ""


@contextmanager
def dfx_network_context():
    Dfx.start()
    try:
        yield
    finally:
        Dfx.stop()


def dfx_local_network(func):
    def fn():
        with dfx_network_context():
            return func()

    return fn


def print_input(msg: str):
    print(f"Input: {msg}")


def print_output(msg: str):
    print(f"Output: {msg}")
