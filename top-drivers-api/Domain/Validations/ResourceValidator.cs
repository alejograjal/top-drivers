using FluentValidation;
using TopDrivers.Infrastructure;

namespace Domain.Validations;

public class ResourceValidator : AbstractValidator<Resource>
{
    public ResourceValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("El nombre no puede estar vacío")
            .NotNull().WithMessage("El nombre es requerido")
            .MaximumLength(50).WithMessage("El nombre no puede exceder los 50 caracteres");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("La descripción no puede estar vacía")
            .NotNull().WithMessage("La descripción es requerida")
            .MaximumLength(50).WithMessage("La descripción no puede exceder los 300 caracteres");
    }
}