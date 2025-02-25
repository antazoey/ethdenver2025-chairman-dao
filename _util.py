from subprocess import PIPE, run


class Dfx:
    @classmethod
    def start(cls):
        cls._run("start", "--background", allow_failure=True)

    @classmethod
    def create_canisters(cls, all: bool = False):
        cmd = ["canister", "create"]
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

    @staticmethod
    def _run(*cmd, allow_failure: bool = False) -> str:
        cmd = ["dfx", *cmd]
        print(" ".join(cmd))
        process = run(cmd, stdout=PIPE, stderr=PIPE)
        if not allow_failure and process.returncode != 0:
            raise ValueError(process.stderr.decode("utf8"))

        result = process.stdout.decode("utf8")
        return result.strip()
